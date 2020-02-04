"""Socket entry point."""

from flask_socketio import Namespace, emit, join_room, leave_room
from flask import current_app as app

from services import UserService
from .socket_messages import socket_messages
from services.jap_event_services import JapEventService
from services.command_service import CommandService
from services.table_services import TableService
from dataclasses import asdict


class SocketServer(Namespace):
    """Socket server class to use flask io Namespace.

    Deals with those messages :
        - connect
        - disconnect
        - join_jap
        - leave_jap
        - join_table
        - start_command
        - end_command
        - next_item
        - choose_item
    """

    def __init__(self):
        """Create the Socket Server object."""
        self.connected_by_jap_event = {}
        self.connected_at_table = {}
        super().__init__()

    @staticmethod
    def get_table_room(table_id):
        """Generate table room route."""
        return "table/" + str(table_id)

    @staticmethod
    def get_user_room(user_id):
        """Generate user room route."""
        return "user/" + str(user_id)

    @staticmethod
    def get_jap_event_room(jap_event_id):
        """Generate jap event room route."""
        return "jap_event/" + str(jap_event_id)

    def add_to_event(self, user, room):
        """Add a user to list of people in jap_event."""
        if room in self.connected_by_jap_event.keys():
            self.connected_by_jap_event[room].append(asdict(user))
        else:
            self.connected_by_jap_event[room] = [asdict(user)]

    def remove_from_event(self, user_id, room):
        """Remove a user from list of people in jap_event."""
        if room in self.connected_by_jap_event.keys():
            self.connected_by_jap_event[room] = [
                user for user in self.connected_by_jap_event[room] if user.get('id') != user_id]
        else:
            app.logger.info(
                "Should not happen: User left jap_event but was not on it")

    def add_to_table(self, user, table):
        """Add a user to list of people on a given table."""
        print("ADD TO TABLE")
        if table.id in self.connected_at_table.keys():
            dict_user = asdict(user)
            table_members = self.connected_at_table[table.id]
            if dict_user not in table_members:
                table_members.append(dict_user)
        else:
            self.connected_at_table[table.id] = [asdict(user)]

    def remove_from_table(self, user_id, table_id):
        """Remove a user from list of people on a given table."""
        if table_id in self.connected_at_table.keys():
            self.connected_at_table[table_id] = list(filter(
                lambda x: x["id"] == user_id,
                self.connected_at_table[table_id]
            ))
        else:
            app.logger.info(
                "Should not happen: User left table but was not on it")

    @staticmethod
    def emit_command_started(current_command, room):
        """Emit command started message after START_COMMAND and JOIN_COMMAND."""
        emit(
            socket_messages['COMMAND_STARTED'],
            {
                "current_command": current_command,
                "command_id": current_command['id'],
                "item_id": current_command['item_id'],
                "accumulated": CommandService.get_accumulated_order_amount(current_command['id']),
                "summary": asdict(CommandService.get_command(current_command['id']))
            },
            room=room
        )

    def on_connect(self):
        """Call when a connection socket is set with a client."""
        app.logger.info("Connection establish in socket with a client")
        emit('my response', {'data': 'Connected'})

    def on_disconnect(self):
        """Call when a connection socket is lost with a client."""
        app.logger.info("Connection socket lost with a client")
        pass

    def on_join_jap(self, data):
        """Call on message JOIN_JAP.

        Emit USER_JOINED_JAP in the room 'jap_event/jap_id'.

        Args :
            data = {user_id, jap_event_id} // later user_id
        Emit :
            USER_JOINED_JAP = {
                "jap_event_id": int,
                "new_member": asdict(new_member),
                "members": list(User)
            }
        """
        app.logger.debug(data)
        user_id = data['user_id']
        jap_event_id = data["jap_event_id"]

        jap_event = JapEventService.get_jap_event(jap_event_id)

        table = TableService.get_user_table(user_id, jap_event_id)
        if table:
            self.on_join_table(
                {"user_id": user_id, "jap_event_id": jap_event_id, "table_id": table.id})
        else:
            if jap_event.created_by == user_id:
                raise (
                    Exception("Error at jap creation for jap creator, not added to a table"))

        new_member = UserService.get_user(user_id)
        room = self.get_jap_event_room(data['jap_event_id'])
        join_room(room)
        self.add_to_event(new_member, room)

        emit(
            socket_messages['USER_JOINED_JAP'],
            {
                "jap_event_id": data['jap_event_id'],
                "new_member": asdict(new_member),
                "members": self.connected_by_jap_event[room]
            },
            room=room
        )

    def on_leave_jap(self, data):
        """Call on message LEAVE_JAP.

        Emit USER_LEFT_JAP in the room 'jap_id'.
        Leave the room jap_event_id and table_id if a table_id is present.

        Args :
            data = {user_id, jap_event_id, ?table_id}
        Emit :
            USER_LEFT_JAP = { jap_event_id, members : [{user_id, name}, ...]}
        """
        app.logger.debug(data)
        app.logger.info(
            "Leave jap " + str(data['jap_event_id']) +
            " received from " + str(data['user_id'])
        )

        room = self.get_jap_event_room(data['jap_event_id'])
        self.remove_from_event(data["user_id"], room)
        answer = {
            **data,
            "members": self.connected_by_jap_event[room]
        }

        if "table_id" in data:
            self.remove_from_table(data["user_id"], data["table_id"])
            answer["table_members"] = self.connected_at_table[data['table_id']]

        emit(
            socket_messages['USER_LEFT_JAP'],
            answer,
            room=room
        )
        leave_room(room)

        if 'table_id' in data:
            leave_room(room)
            self.remove_from_table(data["user_id"], data['table_id'])

    def on_join_table(self, data):
        """Call on message JOIN_TABLE.

        Emit USER_JOINED_TABLE in the room 'table_id'.

        Args :
            data = {user_id, jap_event_id, ?table_id} // later user_id
        Emit :
            USER_JOINED_TABLE = {
                new_member,
                members
            }
        """
        app.logger.debug(data)
        # app.logger.info(
        #     f"Join table {data['table_id']} received from {data['username']}")
        jap_event_room = self.get_jap_event_room(data['jap_event_id'])
        table_room = self.get_table_room(data['table_id'])
        user_room = self.get_user_room(data['user_id'])

        table = TableService.get_table(data['table_id'])
        user = UserService.get_user(data['user_id'])

        self.add_to_table(user, table)

        join_room(table_room)
        join_room(user_room)

        new_member = asdict(user)
        emit(
            socket_messages['USER_JOINED_TABLE'],
            {
                "members": self.connected_at_table[table.id],
                "new_member": new_member,
            },
            room=jap_event_room
        )

    def on_start_command(self, data):
        """Call on message START_COMMAND.

        Emit COMMAND_STARTED in the room 'table_id'.

        Args :
            data = {user_id, jap_event_id, table_id} // later user_id
        Emit :
            COMMAND_STARTED = {
                jap_event_id,
                table_id,
                command : {
                    command_id,
                    command_status,
                    command_number
                }
            }
        """
        app.logger.debug(data)
        table_room = self.get_table_room(data['table_id'])

        if TableService.is_emperor(data["user_id"], data["table_id"]):
            # Make the command start for this table
            TableService.set_table_status(data['table_id'], 1)

            table = TableService.get_table(data['table_id'])
            current_command = asdict(table)['current_command']
            self.emit_command_started(current_command, table_room)

    def on_join_command(self, data):
        """Call on message START_COMMAND.

        Emit COMMAND_STARTED in the room 'table_id'.

        Args :
            data = {user_id, jap_event_id, table_id} // later user_id
        Emit :
            COMMAND_STARTED = {}
        """
        app.logger.debug(data)
        user_room = self.get_user_room(data['user_id'])

        table = TableService.get_table(data['table_id'])
        if table.status == 1:
            current_command = asdict(table)['current_command']
            self.emit_command_started(current_command, user_room)

    def on_end_command(self, data):
        """Call on message END_COMMAND.

        Emit COMMAND_ENDED in the room 'table_id'.

        Args :
            data = {user_id, jap_event_id, table_id} // later user_id
        Emit :
            COMMAND_ENDED = {
                jap_event_id,
                table_id,
                command : {
                    command_id,
                    command_status,
                    command_number,
                    summary : [ item_id : {name, amount, icon_url}, ...]
                }
            }
        """
        app.logger.debug(data)
        if TableService.is_emperor(data['user_id'], data['table_id']):
            _ = TableService.set_table_status(data['table_id'], 2)
            emit(socket_messages['COMMAND_ENDED'], data,
                 room=self.get_table_room(data['table_id']))

    def on_next_item(self, data):
        """Call on message NEXT_ITEM.

        Emit ITEM_CHANGED in the room 'table_id'.

        Args :
            data = {user_id, jap_event_id, table_id, current_item_id} // later user_id
        Emit :
            ITEM_CHANGED = {
                jap_event_id,
                table_id,
                item : {
                    item_id,
                    name,
                    icon_url,
                }
            }
        """
        app.logger.debug(data)

        if TableService.is_emperor(data['user_id'], data['table_id']):
            command = CommandService.create_command(
                data['item_id'], data['table_id'])
            data['command_id'] = command.id
            data['accumulated'] = CommandService.get_accumulated_order_amount(
                data['command_id'])
            data['summary'] = asdict(CommandService.get_unique_command_by_table_id_and_item_id(
                data['table_id'], data['item_id']))
        TableService.set_current_command_id(
            data['table_id'], data['command_id'])
        emit(socket_messages['ITEM_CHANGED'], data,
             room="table/" + str(data['table_id']))

    def on_choose_item(self, data):
        """Call on message CHOOSE_ITEM.

        Emit ITEM_CHOSEN in the room 'table_id'.

        Args :
            data = {user_id, jap_event_id, table_id, item : {item_id, amount}} // later user_id
        Emit :
            ITEM_CHOSEN = {
                jap_event_id,
                table_id,
                command : {
                    command_id,
                    command_status,
                    command_number,on
                    summary : { item_id : {name, amount, icon_url}, ... }
                }
            }
        """
        app.logger.debug(data)
        app.logger.info(
            f"New item {data['item_id']} chosen on table {data['table_id']} received from {data['username']}")
        CommandService.add_user_order_to_command(
            data['command_id'], data['user_id'], data["individual"])
        data['accumulated'] = CommandService.get_accumulated_order_amount(
            data['command_id'])
        data['summary'] = asdict(CommandService.get_unique_command_by_table_id_and_item_id(
            data['table_id'], data['item_id']))
        emit(socket_messages['ITEM_CHOSEN'], data,
             room="table/" + str(data['table_id']))

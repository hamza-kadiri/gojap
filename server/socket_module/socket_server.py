"""Socket entry point."""

from flask_socketio import Namespace, emit, join_room, leave_room
from flask import current_app as app

from services import UserService
from .socket_messages import socket_messages
from services.jap_event_services import JapEventService
from services.command_service import CommandService
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

    """

    def __init__(self):
        """Create the Socket Server object."""
        self.connected_by_room = {}
        super().__init__()

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
                "users_in_room": list(User)
            }
        """
        app.logger.debug(data)
        new_member = UserService.get_user(data['user_id'])
        room = "jap_event/"+str(data['jap_event_id'])
        join_room(room)
        if room in self.connected_by_room.keys():
            self.connected_by_room[room].append(asdict(new_member))
        else:
            self.connected_by_room[room] = [asdict(new_member)]

        emit(
            socket_messages['USER_JOINED_JAP'],
            {
                "jap_event_id": data['jap_event_id'],
                "new_member": asdict(new_member),
                "members": self.connected_by_room[room]
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
            "Leave jap " + data['jap_id'] + " received from " + data['nom'])
        # data = leave_jap_service(data)

        emit(socket_messages['USER_LEFT_JAP'], data, room=data['jap_id'])

        leave_room(data['jap_id'])
        if 'table_id' in data:
            leave_room(data['table_id'])

    def on_join_table(self, data):
        """Call on message JOIN_TABLE.

        Emit USER_JOINED_TABLE in the room 'table_id'.

        Args :
            data = {user_id, jap_event_id, ?table_id} // later user_id
        Emit :
            USER_JOINED_TABLE = {
                new_member : { user_id, name, avatar_url }
                jap_event_id,
                table_id,
                members : [
                    {
                    user_id,
                    name,
                    },
                    ...
                ],
                command : {
                    command_status,
                    current_item : {
                    item_id,
                    name,
                    icon_url
                    }
                }
            }
        """
        app.logger.debug(data)
        app.logger.info(
            f"Join table {data['table_id']} received from {data['username']}")

        join_room(data['table_id'])
        join_room(data['user_id'])

        emit(socket_messages['USER_JOINED_TABLE'], data, room=data['table_id'])

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
        app.logger.info("Command started on table " +
                        data['table_id'] + " received from " + data['nom'])

        if 'is_jap_master' in data and data['is_jap_master']:
            # data = start_command_service(data)
            emit(socket_messages['COMMAND_STARTED'],
                 data, room=data['table_id'])

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
        app.logger.info("Command ended on table " +
                        data['table_id'] + " received from " + data['nom'])

        if 'is_jap_master' in data and data['is_jap_master']:
            emit(socket_messages['COMMAND_ENDED'], data, room=data['table_id'])

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
        app.logger.info(
            f"Next item on table {data['table_id']} received from {data['username']}")
        if 'is_jap_master' in data and data['is_jap_master']:
            # data = next_item_service(data)
            command = CommandService.create_command(
                data['item_id'], data['table_id'])
            data['command_id'] = command.id
            emit(socket_messages['ITEM_CHANGED'], data, room=data['table_id'])

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
                    command_number,
                    summary : { item_id : {name, amount, icon_url}, ... }
                }
            }
        """
        app.logger.debug(data)
        app.logger.info(
            f"New item {data['item_id']} chosen on table {data['table_id']} received from {data['username']}")
        CommandService.add_user_order_to_command(
            data['command_id'], data['user_id'], data['item_id'], data["individual"])
        data['accumulated'] = CommandService.get_accumulated_order_amount(
            data['command_id'])
        emit(socket_messages['ITEM_CHOSEN'], data, room=data['table_id'])
        emit(socket_messages['ITEM_CHOSEN'], data, room=data['user_id'])

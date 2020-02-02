"""Socket entry point."""

from flask_socketio import Namespace, emit, join_room, leave_room
from flask import current_app as app

from services import UserService
from .socket_messages import socket_messages
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

    def add_to_event(self, user, room):
        """Add a user to list of people in jap_event."""
        if room in self.connected_by_jap_event.keys():
            self.connected_by_jap_event[room].append(asdict(user))
        else:
            self.connected_by_jap_event[room] = [asdict(user)]

    def remove_from_event(self, user_id, room):
        """Remove a user from list of people in jap_event."""
        if room in self.connected_by_jap_event.keys():
            print(self.connected_by_jap_event[room])
            self.connected_by_jap_event[room] = [user for user in self.connected_by_jap_event[room] if user.get('id') != user_id]
            print(self.connected_by_jap_event[room])
        else:
            app.logger.info("Should not happen: User left jap_event but was not on it")

    def add_to_table(self, user, table):
        """Add a user to list of people on a given table."""
        if table in self.connected_by_jap_event.keys():
            self.connected_at_table[table].append(asdict(user))
        else:
            self.connected_at_table[table] = [asdict(user)]

    def remove_from_table(self, user_id, table):
        """Remove a user from list of people on a given table."""
        if table in self.connected_at_table.keys():
            self.connected_at_table[table] = list(filter(
                lambda x: x["id"] == user_id,
                self.connected_at_table[table]
            ))
        else:
            app.logger.info("Should not happen: User left table but was not on it")

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
        new_member = UserService.get_user(data['user_id'])
        room = "jap_event/"+str(data['jap_event_id'])
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
            "Leave jap " + str(data['jap_event_id']) + " received from " + str(data['user_id'])
        )

        room = "jap_event/"+str(data['jap_event_id'])
        self.remove_from_event(data["user_id"], room)

        emit(
            socket_messages['USER_LEFT_JAP'],
            {
                 **data,
                 "members": self.connected_by_jap_event[room]
            },
            room=room
        )
        leave_room(room)

        if 'table_id' in data:
            leave_room(data['table_id'])
            self.remove_from_table(data["user_id"], data['table_id'])

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
            "Join table " + data['table_id'] + " received from " + data['nom'])

        # data = join_table_service(data)
        join_room(data['table_id'])

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
        app.logger.info("Command started on table " + data['table_id'] + " received from " + data['user_id'])

        if 'is_jap_master' in data and data['is_jap_master']:
            # data = start_command_service(data)
            emit(socket_messages['COMMAND_STARTED'], data, room=data['table_id'])

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
            # data = end_command_service(data)
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
        app.logger.info("Next item on table " +
                        data['table_id'] + " received from " + data['nom'])
        if 'is_jap_master' in data and data['is_jap_master']:
            # data = next_item_service(data)
            print(data)
            # emit(socket_messages['ITEM_CHANGED'], data, room=data['room])
            emit(socket_messages['ITEM_CHANGED'], data, broadcast=True)

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
            "New item" + data['item_id'] + " chosen on table " + data['table_id'] + " received from " + data['nom'])
        # data = choose_item_service(data)
        emit(socket_messages['ITEM_CHOSEN'], data, room=data['table_id'])

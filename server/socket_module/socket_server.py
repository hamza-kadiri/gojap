"""Entry point for socket messages."""
from flask_socketio import Namespace, emit, join_room, send, leave_room
from flask import current_app as app
from services.services import \
    join_jap_event_service,\
    leave_jap_service,\
    join_table_service, \
    start_command_service,\
    end_command_service,\
    next_item_service,\
    choose_item_service
from .socket_messages import socket_messages

class SocketServer(Namespace):
    """Socket server class to use flask io Namespace.

    Deals with thiose messages :
        - connect
        - disconnect
        - join_jap
        - leave_jap
        - join_table
        - start_command
        - end_command

    """
    
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

        Emit USER_JOINED_JAP in the room 'jap_id'.

        Args :
            data = {nom, jap_id} // later user_id
        """
        app.logger.debug(data)
        app.logger.info("Join " + data['jap_event_id'] +
                        " received from " + data['nom'])
        data = join_jap_event_service(data)
        join_room(data['jap_id'])
        app.logger.debug(data)
        emit(socket_messages['USER_JOINED_JAP'], data, room=data['jap_event_id'])

    def on_leave_jap(self, data):
        """Call on message LEAVE_JAP.

        Emit USER_LEFT_JAP in the room 'jap_id'.
        Leave the room jap_id and table_id if a table id is present.

        Args :
            data = {nom, jap_id, ?table_id} // later user_id
        """
        app.logger.debug(data)
        app.logger.info(
            "Leave jap " + data['jap_id'] + " received from " + data['nom'])
        data = leave_jap_service(data)
        emit(socket_messages['USER_LEFT_JAP'], data, room=data['jap_id'])
        leave_room(data['jap_id'])
        if 'table_id' in data:
            leave_room(data['table_id'])

    def on_join_table(self, data):
        """Call on message JOIN_TABLE.

        Emit USER_JOINED_TABLE in the room 'table_id'.

        Args :
            data = {nom, jap_id, table_id} // later user_id
        """
        app.logger.debug(data)
        app.logger.info(
            "Join table " + data['table_id'] + " received from " + data['nom'])

        data = join_table_service(data)
        join_room(data['table_id'])
        emit(socket_messages['USER_JOINED_TABLE'], data, room=data['table_id'])

    def on_start_command(self, data):
        """Call on message START_COMMAND.

        Emit COMMAND_STARTED in the room 'table_id'.

        Args :
            data = {nom, jap_id, table_id, is_jap_master} // later user_id
        """
        app.logger.debug(data)
        app.logger.info("Command started on table " +
                        data['table_id'] + " received from " + data['nom'])

        if 'is_jap_master' in data and data['is_jap_master']:
            data = start_command_service(data)
            emit(socket_messages['COMMAND_STARTED'], data, room=data['table_id'])

    def on_end_command(self, data):
        """Call on message END_COMMAND.

        Emit COMMAND_ENDED in the room 'table_id'.

        Args :
            data = {nom, jap_id, table_id, is_jap_master} // later user_id
        """
        app.logger.debug(data)
        app.logger.info("Command ended on table " +
                        data['table_id'] + " received from " + data['nom'])

        if 'is_jap_master' in data and data['is_jap_master']:
            data = end_command_service(data)
            emit(socket_messages['COMMAND_ENDED'], data, room=data['table_id'])

    def on_next_item(self, data):
        """Call on message NEXT_ITEM.

        Emit ITEM_CHANGED in the room 'table_id'.

        Args :
            data = {nom, jap_id, table_id, is_jap_master, item_id} // later user_id
        """
        app.logger.debug(data)
        app.logger.info("Next item on table " +
                        data['table_id'] + " received from " + data['nom'])
        if 'is_jap_master' in data and data['is_jap_master']:
            data = next_item_service(data)
            print(data)
            # emit(socket_messages['ITEM_CHANGED'], data, room=data['room])
            emit(socket_messages['ITEM_CHANGED'], data, broadcast=True)

    def on_choose_item(self, data):
        """Call on message CHOOSE_ITEM.

        Emit ITEM_CHOSEN in the room 'table_id'.

        Args :
            data = {nom, jap_id, table_id, item_id} // later user_id
        """
        app.logger.debug(data)
        app.logger.info(
            "New item" + data['item_id'] + " chosen on table " + data['table_id'] + " received from " + data['nom'])
        data = choose_item_service(data)
        emit(socket_messages['ITEM_CHOSEN'], data, room=data['table_id'])

    


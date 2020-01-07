from flask_socketio import Namespace, emit, join_room, send, leave_room
from flask import current_app as app
from .socket_services import \
    join_jap_service,\
    leave_jap_service,\
    join_table_service, \
    start_command_service,\
    end_command_service,\
    next_item_service,\
    choose_item_service
from .socket_messages import socket_messages

class SocketServer(Namespace):
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
            data = {pseudo, jap_id} // later user_id
        """
        app.logger.debug(data)
        app.logger.info("Join " + data['jap_id'] +
                        " received from " + data['pseudo'])
        data = join_jap_service(data)
        join_room(data['jap_id'])
        app.logger.debug(data)
        emit(socket_messages['USER_JOINED_JAP'], data, room=data['jap_id'])

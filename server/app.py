"""App."""

import logging

from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from models.model import db
from socket_module.socket_messages import socket_messages
from services import \
    join_jap_event_service,\
    leave_jap_service,\
    join_table_service, \
    start_command_service,\
    end_command_service,\
    next_item_service,\
    choose_item_service
from http_routes import base_blueprint, auth_blueprint, user_blueprint, jap_event_blueprint, table_blueprint, jap_place_blueprint


app = Flask(__name__)
CORS(app)
gunicorn_error_logger = logging.getLogger('gunicorn.error')
app.logger.handlers.extend(gunicorn_error_logger.handlers)
app.logger.setLevel(logging.DEBUG)

app.config.from_object('config.Config')
app.app_context().push()

db.init_app(app)
db.create_all()

socketio = SocketIO(app, cors_allowed_origins='*')
# Register all the blueprints (AKA the routes)
app.register_blueprint(base_blueprint)
app.register_blueprint(auth_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(jap_event_blueprint)
app.register_blueprint(table_blueprint)
app.register_blueprint(jap_place_blueprint)


@socketio.on('connect')
def connect():
    """Call when a connection socket is set with a client."""
    app.logger.info("Connection establish in socket with a client")
    emit('my response', {'data': 'Connected'})


@socketio.on('disconnect')
def disconnect():
    """Call when a connection socket is lost with a client."""
    app.logger.info("Connection socket lost with a client")


@socketio.on(socket_messages['JOIN_JAP'])
def join_jap(data):
    """Call on message JOIN_JAP.

    Emit USER_JOINED_JAP in the room 'jap_id'.

    Args :
        data = {user_name, jap_id} // later user_id
    """
    app.logger.debug(data)
    app.logger.info("Join " + data['jap_id'] +
                    " received from " + data['user_name'])
    data = join_jap_event_service(data)
    join_room(data['jap_id'])
    app.logger.debug(data)
    emit(socket_messages['USER_JOINED_JAP'], data, room=data['jap_id'])


@socketio.on(socket_messages['LEAVE_JAP'])
def leave_jap(data):
    """Call on message LEAVE_JAP.

    Emit USER_LEFT_JAP in the room 'jap_id'.
    Leave the room jap_id and table_id if a table id is present.

    Args :
        data = {user_name, jap_id, ?table_id} // later user_id
    """
    app.logger.debug(data)
    app.logger.info(
        "Leave jap " + data['jap_id'] + " received from " + data['user_name'])
    data = leave_jap_service(data)
    emit(socket_messages['USER_LEFT_JAP'], data, room=data['jap_id'])
    leave_room(data['jap_id'])
    if 'table_id' in data:
        leave_room(data['table_id'])


@socketio.on(socket_messages['JOIN_TABLE'])
def join_table(data):
    """Call on message JOIN_TABLE.

    Emit USER_JOINED_TABLE in the room 'table_id'.

    Args :
        data = {user_name, jap_id, table_id} // later user_id
    """
    app.logger.debug(data)
    app.logger.info(
        "Join table " + data['table_id'] + " received from " + data['user_name'])

    data = join_table_service(data)
    join_room(data['table_id'])
    emit(socket_messages['USER_JOINED_TABLE'], data, room=data['table_id'])


@socketio.on(socket_messages['START_COMMAND'])
def start_command(data):
    """Call on message START_COMMAND.

    Emit COMMAND_STARTED in the room 'table_id'.

    Args :
        data = {user_name, jap_id, table_id, is_jap_master} // later user_id
    """
    app.logger.debug(data)
    app.logger.info("Command started on table " +
                    data['table_id'] + " received from " + data['user_name'])

    if 'is_jap_master' in data and data['is_jap_master']:
        data = start_command_service(data)
        emit(socket_messages['COMMAND_STARTED'], data, room=data['table_id'])


@socketio.on(socket_messages['END_COMMAND'])
def end_command(data):
    """Call on message END_COMMAND.

    Emit COMMAND_ENDED in the room 'table_id'.

    Args :
        data = {user_name, jap_id, table_id, is_jap_master} // later user_id
    """
    app.logger.debug(data)
    app.logger.info("Command ended on table " +
                    data['table_id'] + " received from " + data['user_name'])

    if 'is_jap_master' in data and data['is_jap_master']:
        data = end_command_service(data)
        emit(socket_messages['COMMAND_ENDED'], data, room=data['table_id'])


@socketio.on(socket_messages['NEXT_ITEM'])
def next_item(data):
    """Call on message NEXT_ITEM.

    Emit ITEM_CHANGED in the room 'table_id'.

    Args :
        data = {user_name, jap_id, table_id, is_jap_master, item_id} // later user_id
    """
    app.logger.debug(data)
    app.logger.info("Next item on table " +
                    data['table_id'] + " received from " + data['user_name'])
    if 'is_jap_master' in data and data['is_jap_master']:
        data = next_item_service(data)
        print(data)
        # emit(socket_messages['ITEM_CHANGED'], data, room=data['room])
        emit(socket_messages['ITEM_CHANGED'], data, broadcast=True)


@socketio.on(socket_messages['CHOOSE_ITEM'])
def choose_item(data):
    """Call on message CHOOSE_ITEM.

    Emit ITEM_CHOSEN in the room 'table_id'.

    Args :
        data = {user_name, jap_id, table_id, item_id} // later user_id
    """
    app.logger.debug(data)
    app.logger.info(
        "New item" + data['item_id'] + " chosen on table " + data['table_id'] + " received from " + data['user_name'])
    data = choose_item_service(data)
    emit(socket_messages['ITEM_CHOSEN'], data, room=data['table_id'])


if __name__ == "__main__":
    print("server is running on port :" + "5000")
    socketio.run(app)

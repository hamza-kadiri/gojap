"""App."""

from flask import Flask, config, jsonify
from flask_cors import CORS
import logging
from flask_socketio import SocketIO, emit, join_room, send, leave_room
from socket_module.socket_messages import socket_messages
from socket_module.socket_services import join_jap_service, leave_jap_service, join_table_service, start_command_service, end_command_service, next_item_service, choose_item_service

app = Flask(__name__)
gunicorn_error_logger = logging.getLogger('gunicorn.error')
app.logger.handlers.extend(gunicorn_error_logger.handlers)
app.logger.setLevel(logging.DEBUG)
app.logger.debug('this will show in the log')
socketio = SocketIO(app, cors_allowed_origins='*')

@app.route('/')
def index():
    return 'hello world'

@socketio.on('connect')
def connect():
    app.logger.info("Connection establish in socket with a client")
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def disconnect():
    app.logger.info("Connection socket lost with a client")

@socketio.on(socket_messages['JOIN_JAP'])
def join_jap(data):
    app.logger.debug(data)
    app.logger.info("Join " + data['jap_id'] + " received from "+ data['pseudo'])
    data = join_jap_service(data)
    join_room(data['jap_id'])
    app.logger.debug(data)
    emit(socket_messages['USER_JOINED_JAP'], data, room=data['jap_id'])


@socketio.on(socket_messages['LEAVE_JAP'])
def leave_jap(data):
    app.logger.debug(data)
    app.logger.info("Leave jap " + data['jap_id'] + " received from "+ data['pseudo'])
    data = leave_jap_service(data)
    # app.logger.debug(data)
    emit(socket_messages['USER_LEFT_JAP'], data, room=data['jap_id'])
    leave_room(data['jap_id'])
    if 'table_id' in data :
        leave_room(data['table_id'])

@socketio.on(socket_messages['JOIN_TABLE'])
def join_table(data):
    app.logger.debug(data)
    app.logger.info("Join table " + data['table_id'] + " received from "+ data['pseudo'])
    data = join_table_service(data)
    join_room(data['table_id'])
    app.logger.debug(data)
    emit(socket_messages['USER_JOINED_TABLE'], data, room=data['table_id'])

@socketio.on(socket_messages['START_COMMAND'])
def start_command(data):
    app.logger.debug(data)
    app.logger.info("Command started on table " + data['table_id'] + " received from "+ data['pseudo'])
    if 'is_jap_master' in data and data['is_jap_master']:
        data = start_command_service(data)
        emit(socket_messages['COMMAND_STARTED'], data, room=data['table_id'])

@socketio.on(socket_messages['END_COMMAND'])
def end_command(data):
    app.logger.debug(data)
    app.logger.info("Command ended on table " + data['table_id'] + " received from "+ data['pseudo'])
    if 'is_jap_master' in data and data['is_jap_master']:
        data = end_command_service(data)
        emit(socket_messages['COMMAND_ENDED'], data, room=data['table_id'])

@socketio.on(socket_messages['NEXT_ITEM'])
def next_item(data):
    app.logger.debug(data)
    app.logger.info("Next item on table " + data['table_id'] + " received from "+ data['pseudo'])
    if 'is_jap_master' in data and data['is_jap_master']:
        data = next_item_service(data)
        emit(socket_messages['ITEM_CHANGED'], data, room=data['table_id'])

@socketio.on(socket_messages['CHOOSE_ITEM'])
def choose_item(data):
    app.logger.debug(data)
    app.logger.info("New item" + data['item_id'] + " chosen on table " + data['table_id'] + " received from "+ data['pseudo'])
    data = choose_item_service(data)
    emit(socket_messages['ITEM_CHOSEN'], data, room=data['table_id'])

if __name__ == "__main__":
    print("server is running on port :" + "5000")
    socketio.run(app)


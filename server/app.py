"""App."""

import logging

from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from models.model import db
from socket_module.socket_messages import socket_messages
from socket_module.socket_server import SocketServer
from services.services import \
    join_jap_event_service,\
    leave_jap_service,\
    join_table_service, \
    start_command_service,\
    end_command_service,\
    next_item_service,\
    choose_item_service
from http_routes import base_blueprint, auth_blueprint, user_blueprint, jap_event_blueprint


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

socketio.on_namespace(SocketServer())

if __name__ == "__main__":
    print("server is running on port :" + "5000")
    socketio.run(app)

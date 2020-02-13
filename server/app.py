"""App."""

import logging

from flask import Flask, session, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_migrate import Migrate
from models.model import db
from socket_module.socket_messages import socket_messages
from http_routes import (
    base_blueprint,
    auth_blueprint,
    user_blueprint,
    jap_event_blueprint,
    construct_oauth_blueprint,
    table_blueprint,
    jap_place_blueprint,
    command_blueprint,
)
from authlib.integrations.flask_client import OAuth
from werkzeug import security
from helpers import init_error_handlers
from socket_module.socket_server import SocketServer

app = Flask(__name__)
CORS(app)
gunicorn_error_logger = logging.getLogger("gunicorn.error")
app.logger.handlers.extend(gunicorn_error_logger.handlers)
app.logger.setLevel(logging.DEBUG)


app.config.from_object("config.Config")
app.app_context().push()

migrate = Migrate(app, db)

db.init_app(app)

oauth = OAuth(app)

viarezo = oauth.register(
    "viarezo",
    client_id=app.config["VIAREZO_CLIENT_ID"],
    client_secret=app.config["VIAREZO_CLIENT_SECRET"],
    request_token_params={"scope": "default", "state": lambda: security.gen_salt(10)},
    api_base_url=app.config["VIAREZO_BASE_URL"],
    access_token_method="POST",
    access_token_url=app.config["VIAREZO_TOKEN_URL"],
    authorize_url=app.config["VIAREZO_AUTH_URL"],
)

socketio = SocketIO(app, cors_allowed_origins="*")
# Register all the blueprints (AKA the routes)
app.register_blueprint(base_blueprint)
app.register_blueprint(auth_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(construct_oauth_blueprint(viarezo))
app.register_blueprint(jap_event_blueprint)
app.register_blueprint(table_blueprint)
app.register_blueprint(jap_place_blueprint)
app.register_blueprint(command_blueprint)


init_error_handlers(app)

socket_server_instance = SocketServer()
socketio.on_namespace(socket_server_instance)

if __name__ == "__main__":
    print("server is running on port :" + "5000")
    socketio.run(app)

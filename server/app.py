"""App."""

from flask import Flask, config, jsonify
from flask_cors import CORS
import logging
from flask_socketio import SocketIO

from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

@app.route('/')
def index():
    return 'hello world'

@socketio.on('my event')
def test_message(message):
    print("joe")
    emit('my response', {'data': message['data']})

@socketio.on('connect', namespace='/api/test')
def test_connect():
    print("user connected")
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')

if __name__ == "__main__":
    print("server is running on port :" + "5000")
    application.run(app)

# def create_app(joe, bob):
#     print(joe)
#     print(bob)
#     """Create and the app."""
#     app = Flask(__name__)
#     # Set CORS

#     app = SocketIO(app, cors_allowed_origins='*')

#     # with app.app_context():
#     #     @app.route("/", methods=['GET'])
#     #     def index():
#     #         return jsonify("Hello World")

#     return app


# application = create_app

# # if __name__ == "__main__":
# #     application().run()

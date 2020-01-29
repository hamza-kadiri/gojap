"""Test socket server call."""

from flask_socketio import SocketIOTestClient, test_client
# from app import app, socketio
# from socket_module.socket_server import SocketServer
from app import app, socketio


def test_socket_connection():
    """Test socket connection is working properly."""
    client = socketio.test_client(app)
    assert client.is_connected()
    received = client.get_received()
    print(received)
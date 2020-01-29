"""Test socket server call."""

from flask_socketio import SocketIOTestClient, test_client
# from socket_module.socket_server import SocketServer
from app import app, socketio
from socket_module.socket_messages import socket_messages


class TestClassWithClient:
    """Base class containing a socket client instance."""

    @classmethod
    def setup_class(cls):
        """Create the client."""
        cls.client = socketio.test_client(app)

class TestSocketServer(TestClassWithClient):
    """Test Class for socket server."""

    def test_socket_connection(self):
        """Test socket connection is working properly."""
        assert self.client.is_connected()
        received = client.get_received()
        print(received)

    def test_join_jap(self):
        """Test join jap."""
        self.client.emit(socket_messages["JOIN_JAP"], {"user_id":0, "jap_event_id":1})
        # client = socketio.test_client(
        #     app, query_string=socket_messages["JOIN_JAP"])
        received = client.get_received()
        print(received)
        # self.assertEqual(len(received), 3)
        # self.assertEqual(received[0]['args'], 'connected')
        # self.assertEqual(received[1]['args'], '{"foo": ["bar", "baz"]}')
        # self.assertEqual(received[2]['args'],
        #                  '{"Authorization": "Bearer foobar"}')
        # client.disconnect()
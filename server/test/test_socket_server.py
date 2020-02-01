"""Test socket server call."""

import datetime

from app import app, socketio
from socket_module.socket_messages import socket_messages
from services.user_services import UserService
from services.jap_place_services import JapPlaceService
from services.jap_event_services import JapEventService
from models.model import Item


class TestClassWithClient:
    """Base class containing a socket client instance."""

    @classmethod
    def setup_class(cls):
        """Create the client."""
        cls.client = socketio.test_client(app)

        cls.jap_creator = UserService.get_user_by_name("jap_creator")
        if cls.jap_creator is None:
            cls.jap_creator = UserService.create_user("jap_creator", "jap_creatorr@user.com", "0678031234", "")
        cls.jap_creator_id = cls.jap_creator.id

        cls.user = UserService.get_user_by_name("TestUser")
        if cls.user is None:
            cls.user = UserService.create_user("TestUser", "testuser@user.com", "0678031234", "")
        cls.user_id = cls.user.id

        cls.icon = JapPlaceService.create_icon("")
        
        JapPlaceService.create_item("sushi", 300, cls.icon.id)
        cls.items = Item.query.all()
        
        cls.menu = JapPlaceService.create_menu(cls.items)

        cls.jap_place = JapPlaceService.get_jap_place_by_name("Oki")
        if cls.jap_place is None:
            cls.jap_place = JapPlaceService.create_jap_place("testJapPlace", "1 rue", "0678031234", "12h", cls.menu.id)
        cls.jap_place_id = cls.jap_place.id

        date = datetime.datetime.now() + datetime.timedelta(days=10)
        cls.jap_event = JapEventService.create_jap_event("Jap de promo", "blabla", cls.jap_place.id, cls.jap_creator.id, date)
        cls.jap_event_id = cls.jap_event.id


class TestSocketServer(TestClassWithClient):
    """Test Class for socket server."""

    def test_socket_connection(self):
        """Test socket connection is working properly."""
        assert self.client.is_connected()
        received = self.client.get_received()

    def test_join_jap(self):
        """Test join jap."""
        self.client.emit(socket_messages["JOIN_JAP"], {"user_id": self.user_id, "jap_event_id": self.jap_event_id})
        received = self.client.get_received()
        received = received[0]
        assert received["name"] == socket_messages['USER_JOINED_JAP']
        assert received["namespace"] == "/"
        answer = received["args"][0]
        assert list(answer.keys()) == ["jap_event_id", "new_member", "members"]
        assert answer["new_member"]["username"] == "TestUser"
        assert answer["new_member"]["id"] in [member["id"] for member in answer["members"]]


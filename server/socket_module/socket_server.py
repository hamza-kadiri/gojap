"""Socket entry point."""

from flask_socketio import Namespace, emit, join_room, leave_room
from flask import current_app as app, request

from helpers.db_selectors import (
    get_item_id_from_table_id_and_index,
    get_item_index_from_table_id_and_id,
)
from services import UserService
from models.model import User, Table
from .socket_messages import socket_messages
from services.jap_event_services import JapEventService
from services.command_service import CommandService
from services.table_services import TableService
from dataclasses import asdict


class SocketServer(Namespace):
    """Socket server class extending flask socket io Namespace.

    Deals with those messages :
        - connect
        - disconnect
        - join_jap
        - leave_jap
        - join_table
        - start_command
        - end_command
        - next_item
        - choose_item
    """

    def __init__(self):
        """Create the Socket Server object."""
        self.connected_by_jap_event = {}
        self.connected_at_table = {}
        self.session_id_user_id = {}
        super().__init__()

    @staticmethod
    def __get_table_room(table_id: int):
        """Generate table room route.
        
        Args:
            table_id: unique id of a table
        """
        return "table/" + str(table_id)

    @staticmethod
    def __get_user_room(user_id: int):
        """Generate user room route.
        
        Args:
            user_id: unique id of a user
        """
        return "user/" + str(user_id)

    @staticmethod
    def __get_jap_event_room(jap_event_id: int):
        """Generate jap event room route."""
        return "jap_event/" + str(jap_event_id)

    def __add_to_event(self, user: User, room: str):
        """Add a user to list of people in jap_event.
        
        Args:
            user: a User
            room: jap event room that the user joined
        """
        if room in self.connected_by_jap_event.keys():
            dict_user = asdict(user)
            event_members = self.connected_by_jap_event[room]
            if dict_user not in event_members:
                event_members.append(dict_user)
        else:
            self.connected_by_jap_event[room] = [asdict(user)]

    def __remove_from_event(self, user_id: int, room: str):
        """Remove a user from list of people in jap_event.
        
        Args:
            user_id: a user id
            room: jap event room that the user left
        """
        if room in self.connected_by_jap_event.keys():
            self.connected_by_jap_event[room] = [
                user
                for user in self.connected_by_jap_event[room]
                if user.get("id") != user_id
            ]
        else:
            app.logger.info("Should not happen: User left jap_event but was not on it")

    def __add_to_table(self, user: User, table: Table):
        """Add a user to list of people on a given table.
        
        Args:
            user: a User
            table: table that the user joined
        """
        if table.id in self.connected_at_table.keys():
            dict_user = asdict(user)
            table_members = self.connected_at_table[table.id]
            if dict_user not in table_members:
                table_members.append(dict_user)
        else:
            self.connected_at_table[table.id] = [asdict(user)]

    def __remove_from_table(self, user_id: int, table_id: int):
        """Remove a user from list of people on a given table.
        
        Args:
            user_id: a user id
            table_id: table id that the user left
        """
        if table_id in self.connected_at_table.keys():
            self.connected_at_table[table_id] = list(
                filter(lambda x: x["id"] != user_id, self.connected_at_table[table_id])
            )
        else:
            app.logger.info("Should not happen: User left table but was not on it")

    @staticmethod
    def __emit_command_started(current_command: dict, room: str):
        """Emit command started message after START_COMMAND and JOIN_COMMAND.

        Args:
            current_command: Command object as a dict
            room: socket room where you want to emit this message
        """
        app.logger.debug("COMMAND_STARTED")
        item_index = get_item_index_from_table_id_and_id(
            current_command["table_id"], current_command["item_id"]
        )
        emit(
            socket_messages["COMMAND_STARTED"],
            {
                "table_id": current_command["table_id"],
                "current_command": current_command,
                "command_id": current_command["id"],
                "item_id": current_command["item_id"],
                "index": item_index,
                "accumulated": CommandService.get_accumulated_order_amount(
                    current_command["id"]
                ),
                "summary": asdict(CommandService.get_command(current_command["id"])),
            },
            room=room,
        )

    def on_connect(self):
        """Call when a connection socket is set with a client."""
        app.logger.info("Connection establish in socket with a client")
        emit("my response", {"data": "Connected"})

    def on_disconnect(self):
        """Call when a connection socket is lost with a client."""
        app.logger.info("Connection socket lost with a client")

        # get the socket session id
        sid = request.sid
        app.logger.info(sid)
        user_data = (
            self.session_id_user_id.pop(sid) if sid in self.session_id_user_id else None
        )
        if user_data:
            app.logger.info(user_data)
            self.__remove_from_event(
                user_data["user_id"],
                self.__get_jap_event_room(user_data["jap_event_id"]),
            )
            if "table_id" in user_data:
                self.__remove_from_table(user_data["user_id"], user_data["table_id"])

        app.logger.info(self.connected_by_jap_event)
        app.logger.info(self.session_id_user_id)
        app.logger.info(self.connected_at_table)

    def on_join_jap(self, data: dict):
        """Call on message JOIN_JAP.

        Emit USER_JOINED_JAP in the room 'jap_event/jap_id'. and USER_JOINED_TABLE if the user has one

        Args :
            data = {user_id, jap_event_id, ?table_id}
        Emit :
            USER_JOINED_JAP = {
                "jap_event_id": int,
                "new_member": asdict(new_member),
                "members": list(User)
            }
        """
        app.logger.info("JOIN_JAP")
        app.logger.info(request.sid)

        session_id = request.sid
        user_id = data["user_id"]
        jap_event_id = data["jap_event_id"]

        self.session_id_user_id[session_id] = {
            "user_id": user_id,
            "jap_event_id": jap_event_id,
        }

        jap_event = JapEventService.get_jap_event(jap_event_id)

        table = TableService.get_user_table(user_id, jap_event_id)

        new_member = UserService.get_user(user_id)
        new_member_dict = asdict(new_member)
        room = self.__get_jap_event_room(data["jap_event_id"])

        if (
            room not in self.connected_by_jap_event
            or new_member_dict not in self.connected_by_jap_event[room]
        ):
            join_room(room)
            self.__add_to_event(new_member, room)
            emit(
                socket_messages["USER_JOINED_JAP"],
                {
                    "jap_event_id": data["jap_event_id"],
                    "new_member": new_member_dict,
                    "members": self.connected_by_jap_event[room],
                },
                room=room,
            )
            if table:
                self.on_join_table(
                    {
                        "user_id": user_id,
                        "jap_event_id": jap_event_id,
                        "table_id": table.id,
                    }
                )
            else:
                # checkt that the user is not a jap creator, otherwise it must have a table.
                if jap_event.creator_id == user_id:
                    raise (
                        Exception(
                            "Error at jap creation for jap creator, not added to a table"
                        )
                    )

    def on_leave_jap(self, data: dict):
        """Call on message LEAVE_JAP.

        Emit USER_LEFT_JAP in the room 'jap_id'.
        Leave the room jap_event_id and table_id if a table_id is present.

        Args :
            data = {user_id, jap_event_id, ?table_id}
        """
        app.logger.info(
            "Leave jap "
            + str(data["jap_event_id"])
            + " received from "
            + str(data["user_id"])
        )

        room = self.__get_jap_event_room(data["jap_event_id"])
        self.__remove_from_event(data["user_id"], room)
        answer = {**data, "members": self.connected_by_jap_event[room]}

        if "table_id" in data:
            self.__remove_from_table(data["user_id"], data["table_id"])
            answer["table_members"] = self.connected_at_table[data["table_id"]]

        emit(socket_messages["USER_LEFT_JAP"], answer, room=room)

        leave_room(room)

        if "table_id" in data:
            leave_room(room)
            self.__remove_from_table(data["user_id"], data["table_id"])

    def on_join_table(self, data: dict):
        """Call on message JOIN_TABLE.

        Emit USER_JOINED_TABLE in the room 'jap_event/jap_event_id'.

        Args :
            data = {user_id, jap_event_id, table_id}
        """
        # get socket rooms
        jap_event_room = self.__get_jap_event_room(data["jap_event_id"])
        table_room = self.__get_table_room(data["table_id"])
        user_room = self.__get_user_room(data["user_id"])

        # add user to table if not already in
        table = TableService.add_user_to_table(data["table_id"], [data["user_id"]])
        # get user object
        user = UserService.get_user(data["user_id"])

        # add table to the session dict
        self.session_id_user_id[request.sid]["table_id"] = table.id

        # add user to the table dict
        self.__add_to_table(user, table)

        # join the socket rooms
        join_room(table_room)
        join_room(user_room)

        app.logger.debug(f"user {user.id} {user.username} JOIN_TABLE")

        # Emit answer
        if user.id in [member.id for member in table.members]:
            emit(
                socket_messages["USER_JOINED_TABLE"],
                {
                    "members": self.connected_at_table[table.id],
                    "new_member": asdict(user),
                    "table_id": table.id,
                    "jap_event_id": data["jap_event_id"],
                    "is_emperor": data["user_id"] == table.emperor,
                },
                room=jap_event_room,
            )

    def on_start_command(self, data: dict):
        """Call on message START_COMMAND.

        Emit COMMAND_STARTED in the room 'table_id'.

        Args :
            data = {user_id, jap_event_id, table_id} // later user_id
        Emit :
            COMMAND_STARTED = {
                jap_event_id,
                table_id,
                command : {
                    command_id,
                    command_status,
                    command_number
                }
            }
        """
        app.logger.debug("START COMMAND")
        app.logger.debug(data)
        table_room = self.__get_table_room(data["table_id"])

        if (
            TableService.is_emperor(data["user_id"], data["table_id"])
            and TableService.get_table(data["table_id"]).status <= 1
        ):
            # Make the command start for this table
            TableService.set_table_status(data["table_id"], 1)

            table = TableService.get_table(data["table_id"])
            current_command = asdict(table)["current_command"]
            self.__emit_command_started(current_command, table_room)

    def on_join_command(self, data: dict):
        """Call on message START_COMMAND.

        Emit COMMAND_STARTED in the room 'user/user_id'.

        Args :
            data = {user_id, table_id}
        """
        app.logger.debug("JOIN COMMAND")
        user_room = self.__get_user_room(data["user_id"])

        table = TableService.get_table(data["table_id"])
        if table.status == 1:
            current_command = asdict(table)["current_command"]
            self.__emit_command_started(current_command, user_room)

    def on_end_command(self, data: dict):
        """Call on message END_COMMAND.

        Emit COMMAND_ENDED in the room 'table/table_id'.

        Args :
            data = {user_id, jap_event_id, table_id}
        """
        app.logger.debug("END COMMAND" + str(data["table_id"]))

        if TableService.is_emperor(data["user_id"], data["table_id"]):

            # set table status to 2
            _ = TableService.set_table_status(data["table_id"], 2)

            # emit message
            emit(
                socket_messages["COMMAND_ENDED"],
                data,
                room=self.__get_table_room(data["table_id"]),
            )

    def on_next_item(self, data: dict):
        """Call on message NEXT_ITEM.

        Emit ITEM_CHANGED in the room 'table/table_id'.

        Args :
            data = {user_id, table_id, index}
        """
        app.logger.debug("NEXT ITEM")

        item_id = get_item_id_from_table_id_and_index(data["table_id"], data["index"])
        if TableService.is_emperor(data["user_id"], data["table_id"]):
            command = CommandService.create_command(item_id, data["table_id"])
            data["command_id"] = command.id
            data["accumulated"] = CommandService.get_accumulated_order_amount(
                data["command_id"]
            )
            data["summary"] = asdict(
                CommandService.get_unique_command_by_table_id_and_item_id(
                    data["table_id"], item_id
                )
            )
        TableService.set_current_command_id(data["table_id"], data["command_id"])
        data["item_id"] = item_id
        emit(
            socket_messages["ITEM_CHANGED"],
            data,
            room=self.__get_table_room(data["table_id"]),
        )

    def on_choose_item(self, data: dict):
        """Call on message CHOOSE_ITEM.

        Emit ITEM_CHOSEN in the room 'table_id'.

        Args :
            data = {user_id, table_id, item_id, username, individual, command_id}
        """
        app.logger.debug("CHOOSE ITEM")
        app.logger.info(
            f"New item {data['item_id']} chosen on table {data['table_id']} received from {data['username']}"
        )
        CommandService.add_user_order_to_command(
            data["command_id"], data["user_id"], data["individual"]
        )
        data["accumulated"] = CommandService.get_accumulated_order_amount(
            data["command_id"]
        )
        data["summary"] = asdict(
            CommandService.get_unique_command_by_table_id_and_item_id(
                data["table_id"], data["item_id"]
            )
        )
        emit(
            socket_messages["ITEM_CHOSEN"],
            data,
            room=self.__get_table_room(data["table_id"]),
        )


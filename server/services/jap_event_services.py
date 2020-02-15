"""Building services for JapEvent management."""

from models.model import JapEvent, User, jap_event_members, db, Table
import datetime
from dataclasses import asdict
from .table_services import TableService
from typing import Dict, Optional, List, Tuple


class JapEventService:
    """Jap event service class."""

    @staticmethod
    def create_jap_event(
        event_name: str,
        description: str,
        jap_place_id: int,
        creator_id: int,
        date: datetime.datetime,
    ) -> JapEvent:
        """
        Create a new jap event. And add a default table to this jap event with the creator as emperor.

        Args :
            data = {event_name, description, jap_place_id, creator_id, date}
        Returns :
            jap_event
        """
        jap_event = JapEvent(
            event_name=event_name,
            description=description,
            jap_place_id=jap_place_id,
            creator_id=creator_id,
            date=date,
        )

        db.session.add(jap_event)
        db.session.commit()

        TableService.create_table(creator_id, jap_event.id)
        JapEventService.join_jap_event(jap_event.id, creator_id)

        return jap_event

    @staticmethod
    def join_jap_event(jap_event_id: int, user_id: int) -> Tuple[JapEvent, User]:
        """Process join jap request.

        Return updated data after changing entries in flash memory or DB

        Args :
            data = {user_id, jap_event_id}

        Returns :
            JapEvent, User
        """
        jap_event = JapEvent.query.get(jap_event_id)
        new_member = User.query.get(user_id)
        jap_event.members.append(new_member)
        db.session.add(jap_event)
        db.session.commit()
        return jap_event, new_member

    @staticmethod
    def get_jap_event(jap_event_id: int) -> JapEvent:
        """Get jap event with it's id."""
        jap_event = JapEvent.query.get(jap_event_id)
        return jap_event

    @staticmethod
    def get_all_jap_events() -> List[JapEvent]:
        """Get all japs."""
        jap_events = JapEvent.query.all()
        return jap_events

    @staticmethod
    def get_jap_events_for_user(user_id: int) -> List[JapEvent]:
        """Get all jap events for a given user.

        Args :
            user_id: int

        Returns :
            jap_events
        """
        jap_events = JapEvent.query.filter(
            JapEvent.members.any(User.id.__eq__(user_id))
        ).all()
        return jap_events

    @staticmethod
    def get_upcoming_jap_events_for_user(user_id: int) -> List[JapEvent]:
        """Get all upcoming jap events for a given user.

        Args :
            user_id: int

        Returns :
            jap_events
        """
        current_time = datetime.date.today()
        jap_events = JapEvent.query.filter(
            JapEvent.members.any(User.id.__eq__(user_id)), JapEvent.date >= current_time
        ).all()
        return jap_events

    @staticmethod
    def add_members_to_jap_event(jap_event_id: int, user_ids: list) -> List[User]:
        """Add multiple people to a jap event.

        Args :
            jap_event_id: int,
            users_ids: [ id1, id2 ]

        Returns :
            User[] // Array of User objects in the Jap Event
        """
        jap_event = JapEvent.query.filter(JapEvent.id.__eq__(jap_event_id)).first()

        members = User.query.filter(User.id.in_(user_ids)).all()

        jap_event.members += members
        db.session.add(jap_event)
        db.session.commit()
        return jap_event.members

    @staticmethod
    def update_status(jap_event_id: int, status: int) -> JapEvent:
        """Update status for a given jap.

        Args :
            jap_event_id: int
            status: int

        Returns :
            jap_event
        """
        jap_event = JapEvent.query.filter(JapEvent.id.__eq__(jap_event_id)).first()

        jap_event.status = status
        db.session.add(jap_event)
        db.session.commit()
        return jap_event

    @staticmethod
    def get_tables_for_a_jap(jap_event_id: int) -> List[Table]:
        """Get tables for a jap event id.

        Args :
            jap_event_id: int

        Returns :
            list of tables
        """
        tables = Table.query.filter(Table.jap_event_id.__eq__(jap_event_id)).all()

        return tables

    @staticmethod
    def get_past_jap_events_for_user(user_id: int) -> List[JapEvent]:
        """Get all upcoming jap events for a given user.

        Args :
            user_id: int

        Returns :
            jap_events
        """
        current_time = datetime.date.today()
        jap_events = JapEvent.query.filter(
            JapEvent.members.any(User.id.__eq__(user_id)), JapEvent.date <= current_time
        ).all()
        return jap_events

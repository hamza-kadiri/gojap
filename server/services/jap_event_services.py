"""Building services for JapEvent management."""

from models.model import JapEvent, User, jap_event_members, db
import datetime
from dataclasses import asdict


class JapEventService:
    """Jap event service class."""

    @staticmethod
    def get_all_jap_events():
        """Get all japs."""
        jap_events = JapEvent.query.all()
        return jap_events

    @staticmethod
    def add_members_to_jap_event(jap_event_id, usernames):
        """Add multiple people to a jap event.

        Args :
            jap_event_id: int,
            members: [ 'username', 'username2' ]

        Returns :
            User[] // Array of User objects in the Jap Event
        """
        jap_event = JapEvent.query.filter(
            JapEvent.id.__eq__(jap_event_id)
        ).first()

        members = User.query.filter(
            User.username.in_(usernames)
        ).all()

        jap_event.members += members
        db.session.add(jap_event)
        db.session.commit()
        return jap_event.members

    @staticmethod
    def join_jap_event(jap_event_id, user_id):
        """Process join jap request.

        Return update data after changing entries in flash memory or DB

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
    def create_jap_event(event_name, description, jap_place_id, created_by, date):
        """
        Create a new jap event.

        Args :
            data = {event_name, description, jap_place_id, created_by, date}
        """
        jap_event = JapEvent(event_name=event_name,
                             description=description,
                             jap_place_id=jap_place_id,
                             created_by=created_by,
                             date=date)

        db.session.add(jap_event)
        db.session.commit()

        JapEventService.join_jap_event(jap_event.id, created_by)

        return jap_event

    @staticmethod
    def get_jap_events_for_user(user_id):
        """Get all jap events for a given user.

        Args :
            user_id: int

        Returns :
            { jap_events }
        """
        jap_events = JapEvent.query.filter(
            JapEvent.members.any(User.id.__eq__(user_id))
        ).all()
        return jap_events

    @staticmethod
    def get_upcoming_jap_events_for_user(user_id):
        """Get all upcoming jap events for a given user.

        Args :
            user_id: int

        Returns :
            { jap_events }
        """
        current_time = datetime.date.today()
        jap_events = JapEvent.query.filter(
            JapEvent.members.any(User.id.__eq__(user_id)),
            JapEvent.date >= current_time
        ).all()
        return jap_events

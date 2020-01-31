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
    def add_members_to_jap_event(data):
        """Add multiple people to a jap event.

        Args :
            data = { jap_event_id, members: [ 'username', 'username2' ] }

        Returns :
            User[] // Array of User objects in the Jap Event
        """
        jap_event = db.session.query(JapEvent).filter_by(JapEvent.id==data['jap_event_id']).first()
        print(jap_event)
        members = User.query.filter(
            User.username.in_(set(data['members']))).all()

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
            {"jap_event": asdict(jap_event), "new_member":asdict(new_member)}
        """
        print(jap_event_id, user_id)
        
        jap_event = db.session.query(JapEvent).get(jap_event_id)
        print(jap_event)
        new_member = db.session.query(User).get(user_id)
        print(new_member)
        jap_event.members.append(new_member)
        db.session.add(jap_event)
        db.session.commit()
        return {"jap_event": asdict(jap_event), "new_member":asdict(new_member)}

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
        print(jap_event)
        db.session.add(jap_event)
        db.session.commit()

        JapEventService.join_jap_event(jap_event.id, created_by)

        return jap_event

    @staticmethod
    def get_jap_events_for_user(data):
        """Get all jap events for a given user.

        Args :
            data = {user_id}

        Returns :
            { jap_events }
        """
        jap_events = JapEvent.query.filter(
            User.id.__eq__(data['user_id'])).all()
        return jap_events

    @staticmethod
    def get_upcoming_jap_events_for_user(data):
        """Get all upcoming jap events for a given user.

        Args :
            data = {user_id}

        Returns :
            { jap_events }
        """
        current_time = datetime.date.today()
        jap_events = JapEvent.query.filter(User.id.__eq__(
            data['user_id']), JapEvent.date >= current_time).all()
        return jap_events

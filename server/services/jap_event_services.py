"""Building services for JapEvent management."""

from models.model import JapEvent, User, jap_event_members, db
import datetime

class JapEventService():
    """Jap event service class."""

    @staticmethod
    def create_jap_event(data):
        """
        Create a new jap event.

        Args :
            data = {event_name, description, jap_place_id, created_by, date}
        """
        jap_event = JapEvent(event_name=data['event_name'],
                            description=data['description'],
                            jap_place_id=data['jap_place_id'],
                            created_by=data['created_by'],
                            date=data['date'])
        db.session.add(jap_event)
        db.session.commit()

        join_jap_event({'user_id': data['created_by'],
                                'jap_event_id': jap_event.id})

        return jap_event

    @staticmethod
    def add_members_to_jap_event(data):
        """Add multiple people to a jap event.

        Args :
            data = { jap_event_id, members: [ 'username', 'username2' ] }

        Returns :
            User[] // Array of User objects in the Jap Event
        """
        jap_event = JapEvent.query.filter_by(id=data['jap_event_id']).first()
        members = User.query.filter(User.username.in_(set(data['members']))).all()

        jap_event.members += members
        db.session.add(jap_event)
        db.session.commit()

        return jap_event.members

    @staticmethod
    def join_jap_event(data):
        """Process join jap request.

        Return update data after changing entries in flash memory or DB

        Args :
            data = {user_id, jap_event_id}

        Returns :
            {user_id, jap_event_id, jap_tables, jap_members}
        """
        jap_event = JapEvent.query.filter_by(id=data['jap_event_id']).first()
        new_member = User.query.filter_by(id=data['user_id']).first()
        jap_event.members.append(new_member)
        db.session.add(jap_event)
        db.session.commit()

        return data

    @staticmethod
    def get_jap_events_for_user(data):
        """Get all jap events for a given user.

        Args :
            data = {user_id}

        Returns :
            { jap_events }
        """
        jap_events = JapEvent.query.filter(User.id.__eq__(data['user_id'])).all()
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
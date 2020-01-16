"""Building services for JapEvent management."""

from models.model import JapEvent, User, jap_event_users, db
import datetime


def create_jap_event_service(data):
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

    join_jap_event_service({'user_id': data['created_by'],
                           'jap_event_id': jap_event.id})

    return jap_event


def join_jap_event_service(data):
    """Process join jap request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {user_id, jap_event_id}

    Returns :
        {user_id, jap_event_id, jap_tables, jap_members}
    """
    jap_event = JapEvent.query.filter_by(id=data['jap_event_id']).first()
    user = User.query.filter_by(id=data['user_id']).first()
    jap_event.users.append(user)
    db.session.add(jap_event)
    db.session.commit()

    return data


def get_jap_events_for_user(data):
    """Get all jap events for a given user.

    Args :
        data = {user_id}

    Returns :
        { jap_events }
    """

    jap_events = JapEvent.query.filter(User.id.__eq__(data['user_id'])).all()
    return jap_events


def get_upcoming_jap_events_for_user(data):
    """Get all upcoming jap events for a given user.

    Args :
        data = {user_id}

    Returns :
        { jap_events }
    """
    current_time = datetime.date.today()
    jap_events = JapEvent.query.filter(User.id.__eq__(data['user_id']), JapEvent.date >= current_time).all()
    return jap_events

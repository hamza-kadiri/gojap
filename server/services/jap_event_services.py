"""Building services for JapEvent management."""

from models.model import JapEvent, User, db


def create_jap_event_service(data):
    """
    Create a new jap event.

    Args :
        data = {event_name, description, jap_place_id, user_id, date}
    """
    jap_event = JapEvent(event_name=data['event_name'],
                         description=data['description'],
                         jap_place_id=data['jap_place_id'],
                         created_by=data['user_id'],
                         date=data['date'])
    db.session.add(jap_event)
    db.session.commit()

    join_jap_event_service({'user_id': data['user_id'],
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
    #japs[data['jap_event_id']].append(data['user_id'])
    #data['jap_tables'] = jap_tables[data['jap_event_id']]
    #data["jap_members"] = japs[data['jap_event_id']]

    jap_event = JapEvent.query.filter_by(id=data['jap_event_id']).first()
    user = User.query.filter_by(id=data['user_id']).first()
    jap_event.users.append(user)
    db.session.add(jap_event)
    db.session.commit()

    return data
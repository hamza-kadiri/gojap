"""Socket entry point for front end messages."""
from socket_module.fake_data import japs, jap_tables
from models.model import *


def create_jap_event_service(data):
    """
    Create a new jap event.

    Args :
        data = {nom, description, jap_place_id, user_id, date}
    """
    jap_event = JapEvent(nom=data['nom'],
                         description=data['description'],
                         jap_place_id=data['jap_place_id'],
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
    japs[data['jap_event_id']].append(data['user_id'])
    data['jap_tables'] = jap_tables[data['jap_event_id']]
    data["jap_members"] = japs[data['jap_event_id']]

    jap_event = JapEvent.query.filter_by(id=data['jap_event_id'])
    user = User.query.filter_by(id=data['user_id'])
    jap_event.users.append(user)
    db.session.add(jap_event)
    db.session.commit()

    return data


def join_table_service(data):
    """Process join table request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {pseudo, jap_id, table_id}

    Returns :
        {pseudo, jap_id, table_id, jap_tables, jap_members}
    """
    jap_id = data['jap_id']
    table_id = data['table_id']
    jap_tables.setdefault(table_id, []).append(data['pseudo'])
    data['jap_tables'] = jap_tables
    data["table_members"] = jap_tables[table_id]
    return data


def leave_table_service(data):
    """Process leave table request.

    Args :
        data = {pseudo, jap_id, ?table_id}
    Returns :
        if table_id :
            {pseudo, jap_id, table_id, jap_tables}
        else :
            {pseudo, jap_id}
    """
    jap_id = data['jap_id']
    if 'table_id' in data:
        table_id = data['table_id']
        jap_tables[jap_id][table_id].remove(data['pseudo'])
        data['jap_tables'] = jap_tables[jap_id]
    return data


def leave_jap_service(data):
    """Process leave jap request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {pseudo, jap_id, ?table_id}

    Returns :
        {pseudo, jap_id, table_id, jap_tables, jap_members}
    """
    data = leave_table_service(data)
    japs[data['jap_id']].remove(data['pseudo'])
    data['jap_members'] = japs[data['jap_id']]
    return data


def start_command_service(data):
    """Process start command request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {pseudo, jap_id, table_id, is_jap_master}

    Returns :
        {pseudo, jap_id, table_id, is_jap_master}
    """
    return data


def end_command_service(data):
    """Process end command request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {pseudo, jap_id, table_id, is_jap_master}

    Returns :
        {pseudo, jap_id, table_id, is_jap_master}
    """
    return data


def choose_item_service(data):
    """Process start command request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {pseudo, jap_id, table_id, item_id}

    Returns :
        {pseudo, jap_id, table_id, item_id}
    """
    data['individual']: data

    return data


def next_item_service(data):
    """Process next item request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {pseudo, jap_id, table_id, item_id, is_jap_master}

    Returns :
        {pseudo, jap_id, table_id, item_id, is_jap_master}
    """
    return data

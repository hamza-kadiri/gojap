"""Socket entry point for front end messages."""
from socket_module.fake_data import japs, jap_tables
from models.model import *


def join_table_service(data):
    """Process join table request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {username, jap_id, table_id}

    Returns :
        {username, jap_id, table_id, jap_tables, jap_members}
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
        data = {username, jap_id, ?table_id}
    Returns :
        if table_id :
            {username, jap_id, table_id, jap_tables}
        else :
            {username, jap_id}
    """
    jap_id = data['jap_id']
    if 'table_id' in data:
        table_id = data['table_id']
        jap_tables[jap_id][table_id].remove(data['username'])
        data['jap_tables'] = jap_tables[jap_id]
    return data


def leave_jap_service(data):
    """Process leave jap request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {username, jap_id, ?table_id}

    Returns :
        {username, jap_id, table_id, jap_tables, jap_members}
    """
    data = leave_table_service(data)
    japs[data['jap_id']].remove(data['username'])
    data['jap_members'] = japs[data['jap_id']]
    return data


def start_command_service(data):
    """Process start command request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {username, jap_id, table_id, is_jap_master}

    Returns :
        {username, jap_id, table_id, is_jap_master}
    """
    return data


def end_command_service(data):
    """Process end command request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {username, jap_id, table_id, is_jap_master}

    Returns :
        {username, jap_id, table_id, is_jap_master}
    """
    return data


def choose_item_service(data):
    """Process start command request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {username, jap_id, table_id, item_id}

    Returns :
        {username, jap_id, table_id, item_id}
    """
    data['accumulated'] = data['accumulated'] + data['individual']
    data['itemId'] = data['item_id']

    return data


def next_item_service(data):
    """Process next item request.

    Return update data after changing entries in flash memory or DB

    Args :
        data = {username, jap_id, table_id, item_id, is_jap_master}

    Returns :
        {username, jap_id, table_id, item_id, is_jap_master}
    """
    return data

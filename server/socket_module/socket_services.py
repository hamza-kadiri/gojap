"""Socket entry point for front end messages """
from .fake_data import japs, jap_tables

def join_jap_service(data):
    japs[data['jap_id']].append(data['pseudo'])
    data['jap_tables'] = jap_tables[data['jap_id']]
    data["jap_members"] = japs[data['jap_id']]
    return data

def join_table_service(data):
    jap_id = data['jap_id']
    table_id = data['table_id']
    jap_tables[jap_id][table_id].append(data['pseudo'])
    data['jap_tables'] = jap_tables[jap_id]
    data["jap_members"] = japs[jap_id]
    return data

def leave_table_service(data):
    jap_id = data['jap_id']
    if 'table_id' in data :
        table_id = data['table_id']
        jap_tables[jap_id][table_id].remove(data['pseudo'])
        data['jap_tables'] = jap_tables[jap_id]
    return data

def leave_jap_service(data):
    data = leave_table_service(data)
    japs[data['jap_id']].remove(data['pseudo'])
    data['jap_members'] = japs[data['jap_id']]
    return data

def start_command_service(data):
    return data

def end_command_service(data):
    return data

def choose_item_service(data):
    return data

def next_item_service(data):
    return data
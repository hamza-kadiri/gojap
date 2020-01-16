"""Table blueprint."""

from flask import Blueprint, request, abort
from services.table_services import create_table_service,\
    get_table_service,\
    add_user_to_table_service,\
    remove_table_service
import json

table_blueprint = Blueprint('table_blueprint', __name__, url_prefix='/table')


@table_blueprint.route('', methods=['POST'])
def create_table():
    """Create a new table.

    Returns :
        {nom, description, jap_place_id, user_id, date}
    """
    data = request.json
    table = create_table_service(data)

    return json.dumps(table.as_dict())


@table_blueprint.route('', methods=['GET'])
def get_table():
    """Create a new table.

    Args :
        id_table : id de la table à get.

    Returns :
        {table}
    """
    data = request.json
    table = get_table_service(data)

    return json.dumps(table.as_dict())


@table_blueprint.route('', methods=['DELETE'])
def remove_table():
    """Delete a user.

    Args :
        data = {id}

    Returns :
        {table}
    """
    data = request.json
    table = remove_table_service(data)
    if not table:
        abort(404, f"User not found")

    return json.dumps(table.as_dict())


@table_blueprint.route('', methods=['POST'])
def add_user_to_table():
    """Create a new table.

    Returns :
        {nom, description, jap_place_id, user_id, date}
    """
    data = request.json
    table = add_user_to_table_service(data)

    return json.dumps(table.as_dict())


@table_blueprint.route('set_status', methods=['POST'])
def set_table_status():
    """Create a new table.

    Arg :
        id : id_table de la table à changer.
        status : nouveau statut de la table.

    Returns :
        {table}
    """
    data = request.json
    table = add_user_to_table_service(data)

    return json.dumps(table.as_dict())

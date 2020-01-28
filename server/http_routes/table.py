# coding=utf-8
"""Table blueprint."""

from flask import Blueprint, request, abort, jsonify
from services.table_services import TableService
import json

table_blueprint = Blueprint('table_blueprint', __name__, url_prefix='/table')


@table_blueprint.route('', methods=['POST'])
def create_table():
    """Create a new table.

     Body args :
        {user_id, jap_event_id}

    Returns :
        {nom, description, jap_place_id, user_id, date}
    """
    data = request.json
    table = TableService.create_table(data)

    return jsonify({table: table.as_dict()})


@table_blueprint.route('<int:table_id>', methods=['GET'])
def get_table(table_id):
    """Create a new table.

    Args :
        id_table : id de la table à get.

    Returns :
        {table}
    """
    table = TableService.get_table(table_id)

    return jsonify({table: table.as_dict()})


@table_blueprint.route('', methods=['DELETE'])
def remove_table():
    """Delete a user.

    Args :
        data = {id}

    Returns :
        {table}
    """
    data = request.json
    table = TableService.remove_table(data)
    if not table:
        abort(404, f"User not found")

    return json.dumps(table.as_dict())


@table_blueprint.route('/add_user', methods=['POST'])
def add_user_to_table():
    """Create a new table.

    Returns :
        {nom, description, jap_place_id, user_id, date}
    """
    data = request.json
    table = TableService.add_user_to_table(data)

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
    table = TableService.add_user_to_table(data)

    return json.dumps(table.as_dict())

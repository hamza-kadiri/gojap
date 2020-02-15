"""Table blueprint."""
from flask import Blueprint, request, abort, jsonify, Response
from services.table_services import TableService

table_blueprint = Blueprint("table_blueprint", __name__, url_prefix="/table")


@table_blueprint.route("", methods=["POST"])
def create_table() -> Response:
    """Create a new table.

     Body args :
        {user_id, jap_event_id}

    Returns :
        {table}
    """
    data = request.json
    table = TableService.create_table(**data)

    return jsonify(table)


@table_blueprint.route("<int:table_id>", methods=["GET"])
def get_table(table_id: int) -> Response:
    """Get a given table.

    Args :
        id_table : id de la table à get.

    Returns :
        {table}
    """
    table = TableService.get_table(table_id)

    return jsonify(table)


@table_blueprint.route("", methods=["DELETE"])
def remove_table() -> Response:
    """Delete a table.

    Args :
        data = {id}

    Returns :
        {table}
    """
    data = request.json
    table = TableService.remove_table(data['id'])
    if not table:
        abort(404, f"Table not found")

    return jsonify(table)


@table_blueprint.route("add_members/<int:table_id>", methods=["POST"])
def add_user_to_table(table_id: int) -> Response:
    """
    Add users to a table referenced by its id.

    Returns :
        {nom, description, jap_place_id, user_id, date}
    """
    data = request.json
    table = TableService.add_users_to_table(table_id, data["user_ids"])

    return jsonify(table)


@table_blueprint.route("/<int:table_id>/status/<int:status>", methods=["PUT"])
def set_table_status(table_id: int, status: int) -> Response:
    """
    Update status of a table.

    Arg :
        table_id : id_table de la table à changer.
        status : new status of the table.

    Returns :
        {table}
    """
    table = TableService.set_table_status(table_id, status)

    return jsonify(table)


@table_blueprint.route("/user/<int:user_id>/<int:jap_event_id>", methods=["GET"])
def get_user_table(user_id: int, jap_event_id: int) -> Response:
    """
    Get a user's table associated to a jap event.

    Args :
        id_table : id de la table à get.

    Returns :
        {table}
    """
    table = TableService.get_user_table(user_id, jap_event_id)

    return jsonify(table)


@table_blueprint.route("/stats/<int:table_id>", methods=["GET"])
def get_table_stats(table_id: int) -> Response:
    """Get all stats for a jap.

    Args :
        id_table : id de la table à get.

    Returns :
        {table}
    """
    stats = TableService.get_table_stats(table_id)

    return jsonify(stats)

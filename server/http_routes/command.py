"""Command blueprint."""

from flask import Blueprint, request, abort, jsonify
from services.command_service import CommandService
from helpers import json_abort
from models.model import db
import json

command_blueprint = Blueprint(
    'command_blueprint', __name__, url_prefix='/command')


@command_blueprint.route('<int:command_id>', methods=['GET'])
def get_command(command_id: int):
    """Find a given command.

    Returns :
        {command : id, item_id, table_id, users }
    """
    command = CommandService.get_command(command_id)

    if not command:
        return json_abort(404, f"No command with id {command_id}")
    return jsonify({"command": command})


@command_blueprint.route('', methods=['POST'])
def create_command():
    """Create a new command.

    Args :
        data = {item_id, table_id}

    Returns :
        {command : id, item_id, table_id, users }
    """
    data = request.json
    if not data or "item_id" not in data or "table_id" not in data:
        abort(400)
    command = CommandService.create_command(data["item_id"], data["table_id"])

    return jsonify({"command": command})


@command_blueprint.route('<int:command_id>/add', methods=['POST'])
def add_user_order_to_command(command_id):
    """Add a user to a command with an item and an order amount.

    Args :
        data = {user_id, item_id, order_amount}

    Returns :
        {command : id, item_id, table_id, users }
    """
    data = request.json
    if not data or "order_amount" not in data or "user_id" not in data or "item_id" not in data:
        abort(400)

    command = CommandService.add_user_order_to_command(
        command_id=command_id, user_id=data["user_id"], item_id=data["item_id"], order_amount=data["order_amount"])
    return jsonify({"command": command})


@command_blueprint.route('table/<int:table_id>', methods=['GET'])
def get_command_by_table_id(table_id: int):
    """Get commands for a table.

    Returns :
        {command: id, user_id, table_id}
    """
    command = CommandService.get_command_by_table_id(table_id)
    if not command:
        return json_abort(404, f"Command not found")

    return jsonify({"command": command})


@command_blueprint.route('table/<int:table_id>/item/<int:item_id>', methods=['GET'])
def get_unique_command_by_table_id_and_item(table_id: int, item_id: int):
    """Get a unique command for a table_id and item_id.

    Returns :
        {command: id, item_id, table_id, users}
    """
    command = CommandService.get_unique_command_by_table_id_and_item_id(
        table_id, item_id)
    if not command:
        return json_abort(404, f"Command not found")

    return jsonify(command)

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

    Args :
        data = {command_id}

    Returns :
        {command : id, user_id, table_id}
    """
    data = request.json
    command = CommandService.get_command(command_id)

    if not command:
        return json_abort(404, f"No command with id {command_id}")
    return jsonify({"command": command})


@command_blueprint.route('', methods=['POST'])
def create_command():
    """Create a new command.

    Args :
        data = {user_id, table_id}

    Returns :
        {command: id, user_id, table_id}
    """
    data = request.json
    if not data or "user_id" not in data or "table_id" not in data:
        abort(400)
    command = CommandService.create_command(data["user_id"], data["table_id"])

    return jsonify({"command": command})


@command_blueprint.route('<int:command_id>/add', methods=['POST'])
def add_user_order_to_command(command_id):
    """Create a new command.

    Args :
        data = {command_id, user_id, item_id, order_amount}

    Returns :
        {command}
    """
    data = request.json
    if not data or "order_amount" not in data or "user_id" not in data or "item_id" not in data:
        abort(400)

    command = CommandService.add_user_order_to_command(
        command_id=command_id, user_id=data["user_id"], item_id=data["item_id"], order_amount=data["order_amount"])

    return jsonify({"command": command})


@command_blueprint.route('table/<int:table_id>', methods=['GET'])
def get_command_by_table_id(table_id: int):
    """Delete a user from a command.

    Args :
        data = {id}

    Returns :
        {command: id, user_id, table_id}
    """
    command = CommandService.get_command_by_table_id(table_id)
    if not command:
        return json_abort(404, f"Command not found")

    return jsonify({"command": command.as_dict()})


@command_blueprint.route('/all', methods=['GET'])
def get_all_users():
    """Display all users.

    Args :
        None

    Returns :
        list of users
    """
    users = UserService.get_all_users()
    return jsonify(users)

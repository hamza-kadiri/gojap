"""User blueprint."""

from flask import Blueprint, request, abort, jsonify, Response
# from sqlalchemy import or
from services.user_services import UserService
from helpers import json_abort
from models.model import db, User
from sqlalchemy import or_
import json

user_blueprint = Blueprint('user_blueprint', __name__, url_prefix='/user')


@user_blueprint.route('<int:user_id>', methods=['GET'])
def get_user(user_id: int):
    """Find a given user.

    Returns :
        {user : id, username, email, phone, calorie}
    """
    user = UserService.get_user(user_id)

    if not user:
        return json_abort(404, f"No user with id {user_id}")
    return jsonify(user)


@user_blueprint.route('', methods=['POST'])
def create_user():
    """Create a new user.

    Args :
        data = {username, email, phone, ?avatar_url}

    Returns :
        {user : id, username, email, phone, calorie}
    """
    data = request.json
    avatar_url = data["avatar_url"] if "avatar_url" in data else ""

    user = UserService.create_user(
        data["username"], data["email"], data["phone"], avatar_url)

    return jsonify({"user": user})


@user_blueprint.route('<int:user_id>', methods=['DELETE'])
def remove_user(user_id: int):
    """Delete a user.

    Returns :
        {username, email, phone, calorie}
    """
    user = UserService.remove_user(user_id)
    if not user:
        return json_abort(404, f"User not found")

    return jsonify({"user": user})


@user_blueprint.route('/all', methods=['GET'])
def get_all_users():
    """Display all users.

    Returns :
        list of serialized users
    """
    users = UserService.get_all_users()
    return jsonify({"users": users})


@user_blueprint.route('/stats/<int:user_id>', methods=['GET'])
def get_users_stats(user_id: int) -> Response:
    """Display all users.

    Returns :
        list of serialized users
    """
    stats = UserService.get_user_stats(user_id)
    return jsonify({"stats": stats})

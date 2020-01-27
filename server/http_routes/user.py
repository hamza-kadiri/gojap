"""User blueprint."""

from flask import Blueprint, request, abort
# from sqlalchemy import or
from services.user_services import UserService
import json

user_blueprint = Blueprint('user_blueprint', __name__, url_prefix='/user')


@user_blueprint.route('', methods=['GET'])
def get_user():
    """Find a given user.

    Args :
        data = {id}

    Returns :
        {username, id, email, phone, calorie}
    """
    data = request.json
    user = UserService.get_user(data)

    if not user:
        abort(404, f"No user with id {data['id']}")
    return json.dumps(user.as_dict())


@user_blueprint.route('', methods=['POST'])
def create_user():
    """Create a new user.

    Args :
        data = {username, email, phone, ?avatar_url}

    Returns :
        {id, username, email, phone, calorie}
    """
    print("hey")
    print(request)
    data = request.json
    print(data)
    avatar_url = data["avatar_url"] if "avatar_url" in data else None
    user = UserService.create_user(data["username"], data["email"], data["phone"], avatar_url)

    return json.dumps(user.as_dict())


@user_blueprint.route('', methods=['DELETE'])
def remove_user():
    """Delete a user.

    Args :
        data = {id}

    Returns :
        {username, email, phone, calorie}
    """
    data = request.json
    user = UserService.remove_user(data)
    if not user:
        abort(404, f"User not found")

    return json.dumps(user.as_dict())


@user_blueprint.route('/all', methods=['GET'])
def get_all_users():
    """Display all users.

    Args :
        None

    Returns :
        list of users
    """
    users = UserService.get_all_users()
    dict_users = {}
    for user in users:
        user = user.as_dict()
        dict_users[user['id']] = user
    return dict_users


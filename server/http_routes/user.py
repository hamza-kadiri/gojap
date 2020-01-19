"""User blueprint."""

from flask import Blueprint, request, jsonify
from helpers import json_abort
from models.model import db, User
from sqlalchemy import or_
from services.user_services import *
import json

user_blueprint = Blueprint('user_blueprint', __name__, url_prefix='/user')


@user_blueprint.route('<int:user_id>', methods=['GET'])
def get_user(user_id: int):
    """Find a given user.

    Args :
        data = {id}

    Returns :
        {pseudo, id, email, phone, calorie}
    """
    user = get_user_service(user_id)

    if not user:
        return json_abort(404, f"No user with id {user_id}")
    return jsonify(user.as_dict())


@user_blueprint.route('', methods=['POST'])
def create_user():
    """Create a new user.

    Args :
        data = {pseudo, email, phone}

    Returns :
        {pseudo, email, phone, calorie}
    """
    data = request.json
    old_user = db.session.query(User).filter(
        or_(User.email == data['email'], User.phone == data['phone'])).first()
    if old_user:
        json_abort(
            409, f"User already exists. We do not allow for duplicate phones, emails, or pseudos.")

    user = create_user_service(data)

    return jsonify({"user": user.as_dict()})


@user_blueprint.route('<int:user_id>', methods=['DELETE'])
def remove_user(user_id: int):
    """Delete a user.

    Args :
        data = {id}

    Returns :
        {pseudo, email, phone, calorie}
    """
    user = remove_user_service(user_id)
    if not user:
        return json_abort(404, f"User not found")

    return jsonify({"user": user.as_dict()})


@user_blueprint.route('/all', methods=['GET'])
def get_all_users():
    """Display all users.

    Args :
        None

    Returns :
        list of users
    """
    users = get_all_users_service()
    dict_users = {}
    for user in users:
        user = user.as_dict()
        dict_users[user['id']] = user
    return jsonify({"users": [user.as_dict() for user in users]})

"""User blueprint."""

from flask import Blueprint, request, abort
from models.model import db, User
from sqlalchemy import or_
from services.user_services import *
import json

user_blueprint = Blueprint('user_blueprint', __name__, url_prefix='/user')


@user_blueprint.route('', methods=['GET'])
def get_user():
    """Find a given user.

    Args :
        data = {id}

    Returns :
        {pseudo, id, email, phone, calorie}
    """
    data = request.json
    user = get_user_service(data)

    if not user:
        abort(404, f"No user with id {data['id']}")
    return json.dumps(user.as_dict())


@user_blueprint.route('', methods=['POST'])
def create_user():
    """Create a new user.

    Args :
        data = {pseudo, email, phone}

    Returns :
        {pseudo, email, phone, calorie}
    """
    data = request.json
    old_user = db.session.query(User).filter(or_(User.email == data['email'], User.phone == data['phone'])).first()
    if old_user:
        abort(409, f"User already exists. We do not allow for duplicate phones, emails, or pseudos.")

    user = create_user_service(data)

    return json.dumps(user.as_dict())


@user_blueprint.route('', methods=['DELETE'])
def remove_user():
    """Delete a user.

    Args :
        data = {id}

    Returns :
        {pseudo, email, phone, calorie}
    """
    data = request.json
    user = remove_user_service(data)
    if not user:
        abort(404, f"User not found")

    return json.dumps(user.as_dict())

"""User blueprint."""

from flask import Blueprint, request, jsonify
from helpers import json_abort
from models.model import db, User
from sqlalchemy import or_

user_blueprint = Blueprint('user_blueprint', __name__, url_prefix='/user')


@user_blueprint.route('<int:user_id>', methods=['GET'])
def get_user(user_id: int):
    """Find a given user.

    Returns :
        {pseudo, id, email, phone, calorie}
    """
    user = db.session.query(User).filter_by(id=user_id).first()

    if not user:
        return json_abort(404, f"No user with id {user_id}")
    return jsonify(user.as_dict())


@user_blueprint.route('', methods=['POST'])
def create_user():
    """Create a new user.

    Returns :
        {pseudo, email, phone, calorie}
    """
    body = request.json
    print(body)
    old_user = db.session.query(User).filter(
        or_(User.email == body['email'], User.phone == body['phone'])).first()
    if old_user:
        json_abort(
            409, f"User already exists. We do not allow for duplicate phones, emails, or pseudos.")

    db.session.add(User(**body))
    db.session.commit()
    return jsonify({"user": body}), 200

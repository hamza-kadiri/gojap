"""User blueprint."""

from flask import Blueprint, request, abort
from models.model import db, User
from sqlalchemy import or_

user_blueprint = Blueprint('user_blueprint', __name__, url_prefix='/user')


@user_blueprint.route('', methods=['GET'])
def get_user():
    """Find a given user.

    Returns :
        {pseudo, id, email, phone, calorie}
    """
    if not request.args.get('user_id'):
        abort(400, f"Please provide a user_id")

    user_id = int(request.args.get('user_id'))
    user = db.session.query(User).filter_by(id=user_id).first()

    if not user:
        abort(404, f"No user with id {user_id}")
    return user.as_dict()


@user_blueprint.route('', methods=['POST'])
def create_user():
    """Create a new user.

    Returns :
        {pseudo, email, phone, calorie}
    """
    body = request.json
    old_user = db.session.query(User).filter(or_(User.email == body['email'], User.phone == body['phone'])).first()
    if old_user:
        abort(409, f"User already exists. We do not allow for duplicate phones, emails, or pseudos.")

    db.session.add(User(**body))
    db.session.commit()
    return body


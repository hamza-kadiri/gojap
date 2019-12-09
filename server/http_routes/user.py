"""User blueprint."""

from flask import Blueprint, request, abort
from pydash import find
from .mocks.user import users

user_blueprint = Blueprint('user_blueprint', __name__, url_prefix='/user')


@user_blueprint.route('', methods=['GET'])
def get_user():
    """Find a given user."""
    user_id = int(request.args.get('user_id'))
    print("id", user_id)

    # FIXME: Replace this with a function to find a user in the DB
    user = find(users, lambda x: x["id"] == user_id)
    if not user:
        abort(404, f"No user with id {user_id}")
    return user


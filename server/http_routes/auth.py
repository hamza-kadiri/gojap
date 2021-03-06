"""Auth blueprint."""

from flask import Blueprint, request, jsonify
from services.auth_service import AuthService

auth_blueprint = Blueprint("auth_blueprint", __name__, url_prefix="/auth")


@auth_blueprint.route("/login", methods=["POST"])
def login():
    """Log a user in.

    Args :
        data = { username }

    Returns :
        A user object
    """
    data = request.json
    if not data["username"]:
        return json_abort(400, f"Empty string not allowed as a username")
    user = AuthService.login(data["username"])
    return jsonify(user)

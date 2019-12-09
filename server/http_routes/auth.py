"""Auth blueprint."""

from flask import Blueprint, request
auth_blueprint = Blueprint('auth_blueprint', __name__, url_prefix='/auth')


@auth_blueprint.route('/login', methods=['POST'])
def login():
    """Log a user in."""
    body = request.json
    return f'{body["username"]} successfully logged in'


@auth_blueprint.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    body = request.json
    return f'{body["username"]} successfully created an account'

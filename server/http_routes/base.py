"""Base blueprint."""

from flask import Blueprint
base_blueprint = Blueprint('base_blueprint', __name__, url_prefix='/')


@base_blueprint.route('', methods=['GET'])
def hello_world():
    """Random http route."""
    return 'Hello world'

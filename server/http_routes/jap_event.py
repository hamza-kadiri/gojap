"""User blueprint."""

from flask import Blueprint, request, abort
from models.model import db, User
from sqlalchemy import or_
from services.services import *

jap_event_blueprint = Blueprint('jap_event_blueprint', __name__, url_prefix='/jap_event')


@jap_event_blueprint.route('', methods=['POST'])
def create_jap_event():
    """Create a new jap_event.

    Returns :
        {nom, description, jap_place_id, user_id, date}
    """
    body = request.json
    jap_event = create_jap_event_service(body)

    return jap_event
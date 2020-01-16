"""JapEvent blueprint."""

from flask import Blueprint, request, abort
from models.model import db, User
from sqlalchemy import or_
from services.services import *
import json

jap_event_blueprint = Blueprint('jap_event_blueprint', __name__, url_prefix='/jap_event')


@jap_event_blueprint.route('', methods=['POST'])
def create_jap_event():
    """Create a new jap_event.

    Returns :
        {event_name, description, jap_place_id, user_id, date}
    """
    data = request.json
    jap_event = create_jap_event_service(data)

    return json.dumps(jap_event.as_dict(), indent=4, sort_keys=True, default=str)

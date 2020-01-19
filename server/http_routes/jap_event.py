"""JapEvent blueprint."""

from flask import Blueprint, request, abort
from models.model import db, User
from sqlalchemy import or_
from services.jap_event_services import create_jap_event_service, get_jap_events_for_user, get_upcoming_jap_events_for_user, add_members_to_jap_event
import json

jap_event_blueprint = Blueprint(
    'jap_event_blueprint', __name__, url_prefix='/jap_event')


@jap_event_blueprint.route('', methods=['POST'])
def create_jap_event():
    """Create a new jap_event.

    Returns :
        {event_name, description, jap_place_id, created_by, date}
    """
    data = request.json
    jap_event = create_jap_event_service(data)

    return json.dumps(jap_event.as_dict(), indent=4, sort_keys=True, default=str)


@jap_event_blueprint.route('', methods=['GET'])
def get_events_for_user():
    """Get all jap_events for a given user.

    Args :
        data = {user_id}

    Returns :
        { jap_events }
    """
    data = request.json
    jap_events = get_jap_events_for_user(data)

    jap_events = list(map(lambda event: event.as_dict(), jap_events))
    return json.dumps(jap_events)


@jap_event_blueprint.route('/upcoming', methods=['GET'])
def get_upcoming_events_for_user():
    """Get all upcoming jap_events for a given user.

    Args :
        data = {user_id}

    Returns :
        { jap_events }
    """
    data = request.json
    jap_events = get_upcoming_jap_events_for_user(data)

    jap_events = list(map(lambda event: event.as_dict(), jap_events))
    return json.dumps(jap_events)


@jap_event_blueprint.route('/add_members', methods=['GET'])
def add_members():
    """Add members to a jap event.

    Args :
        data = { jap_event_id, members: [{ username }] }

    Returns :
        { members: [User] }
    """
    data = request.json
    members = add_members_to_jap_event(data)

    members = list(map(lambda u: u.as_dict(), members))
    return json.dumps({"members": members})

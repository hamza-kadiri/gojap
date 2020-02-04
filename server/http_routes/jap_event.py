"""JapEvent blueprint."""

from flask import Blueprint, request, jsonify
from services.jap_event_services import JapEventService

jap_event_blueprint = Blueprint(
    'jap_event_blueprint', __name__, url_prefix='/jap_event')


@jap_event_blueprint.route('event/<int:jap_event_id>', methods=['GET'])
def get_jap_event(jap_event_id):
    """Get jap event for a given event id.

    Returns :
        {serialized jap_event}
    """
    jap_event = JapEventService.get_jap_event(jap_event_id)
    return jsonify(jap_event)


@jap_event_blueprint.route('/all', methods=['GET'])
def get_all_jap_events():
    """Get all jap events.

    Returns :
        list of serialized jap_event
    """
    jap_events = JapEventService.get_all_jap_events()
    return jsonify(jap_events)


@jap_event_blueprint.route('', methods=['POST'])
def create_jap_event():
    """Create a new jap_event.

    Body args : 
        {event_name, description, jap_place_id, creator_id, date}

    Returns :
        {serialized jap_event}
    """
    data = request.json
    jap_event = JapEventService.create_jap_event(
        data["event_name"],
        data["description"],
        data["jap_place_id"],
        data["creator_id"],
        data["date"]
    )

    return jsonify(jap_event)


@jap_event_blueprint.route('<int:user_id>', methods=['GET'])
def get_events_for_user(user_id):
    """Get all jap_events for a given user.

    Args :
        user_id

    Returns :
        list of serialized jap_events
    """
    jap_events = JapEventService.get_jap_events_for_user(user_id)
    return jsonify({"events": jap_events})


@jap_event_blueprint.route('/upcoming/<int:user_id>', methods=['GET'])
def get_upcoming_events_for_user(user_id):
    """Get all upcoming jap_events for a given user.

    Args :
        user_id: int

    Returns :
        list of serialized jap_events
    """
    jap_events = JapEventService.get_upcoming_jap_events_for_user(user_id)
    return jsonify(jap_events)


@jap_event_blueprint.route('/add_members/<int:jap_event_id>', methods=['POST'])
def add_members(jap_event_id: int):
    """Add members to a jap event.

    Args :
        jap_event_id, data = {members: [ user_id, user_id2 ] }

    Returns :
        { members: [User] }
    """
    data = request.json
    members = JapEventService.add_members_to_jap_event(
        jap_event_id, set(data['members']))
    return jsonify(members)


@jap_event_blueprint.route('<int:jap_event_id>/status/<int:status>', methods=['PUT'])
def update_status(jap_event_id: int, status: int):
    """Update status of a jap event.

    Args :
        jap_event_id, status

    Returns :
        serialized jap_event
    """
    jap_event = JapEventService.update_status(jap_event_id, status)
    return jsonify(jap_event)


@jap_event_blueprint.route('/table/<int:jap_event_id>', methods=['GET'])
def get_tables_jap_event(jap_event_id: int):
    """Add members to a jap event.

    Args :
        jap_event_id

    Returns :
        list of serialized tables
    """
    tables = JapEventService.get_tables_for_a_jap(jap_event_id)
    return jsonify(tables)

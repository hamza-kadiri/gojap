"""JapEvent blueprint."""
from dataclasses import asdict

from flask import Blueprint, request, jsonify, Response
from services import TableService
from services.jap_event_services import JapEventService

jap_event_blueprint = Blueprint(
    "jap_event_blueprint", __name__, url_prefix="/jap_event"
)


@jap_event_blueprint.route("", methods=["POST"])
def create_jap_event() -> Response:
    """Create a new jap_event.

    Body args :
        {event_name, description, jap_place_id, creator_id, date}

    Returns :
        {serialized jap_event}
    """
    data = request.json
    if not data["event_name"]:
        return json_abort(400, f"Empty string not allowed as a event_name")
    jap_event = JapEventService.create_jap_event(
        data["event_name"],
        data["description"],
        data["jap_place_id"],
        data["creator_id"],
        data["date"],
    )

    return jsonify(jap_event)


@jap_event_blueprint.route("event/<int:jap_event_id>", methods=["GET"])
def get_jap_event(jap_event_id: int) -> Response:
    """Get jap event for a given event id.

    Returns :
        {serialized jap_event}
    """
    jap_event = JapEventService.get_jap_event(jap_event_id)
    return jsonify(jap_event)


@jap_event_blueprint.route("/all", methods=["GET"])
def get_all_jap_events() -> Response:
    """Get all jap events.

    Returns :
        list of serialized jap_event
    """
    jap_events = JapEventService.get_all_jap_events()
    return jsonify(jap_events)


@jap_event_blueprint.route("user/<int:user_id>", methods=["GET"])
def get_jap_events_for_user(user_id: int) -> Response:
    """Get all jap_events for a given user.

    Args :
        user_id

    Returns :
        list of serialized jap_events
    """
    jap_events = JapEventService.get_jap_events_for_user(user_id)
    return jsonify(jap_events)


@jap_event_blueprint.route("/upcoming/<int:user_id>", methods=["GET"])
def get_upcoming_jap_events_for_user(user_id: int) -> Response:
    """Get all upcoming jap_events for a given user.

    Args :
        user_id: int

    Returns :
        list of serialized jap_events
    """
    jap_events = JapEventService.get_upcoming_jap_events_for_user(user_id)
    return jsonify(jap_events)


@jap_event_blueprint.route("/add_members/<int:jap_event_id>", methods=["POST"])
def add_members(jap_event_id: int) -> Response:
    """Add members to a jap event.

    Args :
        jap_event_id, data = {members: [ user_id, user_id2 ] }

    Returns :
        { members: [User] }
    """
    data = request.json
    members = JapEventService.add_members_to_jap_event(
        jap_event_id, set(data["members"])
    )
    return jsonify(members)


@jap_event_blueprint.route("<int:jap_event_id>/status/<int:status>", methods=["PUT"])
def update_status(jap_event_id: int, status: int) -> Response:
    """Update status of a jap event.

    Args :
        jap_event_id, status

    Returns :
        serialized jap_event
    """
    jap_event = JapEventService.update_status(jap_event_id, status)
    return jsonify(jap_event)


@jap_event_blueprint.route("/table/<int:jap_event_id>", methods=["GET"])
def get_tables_jap_event(jap_event_id: int) -> Response:
    """Get tables for a jap event.

    Args :
        jap_event_id

    Returns :
        list of serialized tables
    """
    tables = JapEventService.get_tables_for_a_jap(jap_event_id)
    return jsonify(tables)


@jap_event_blueprint.route("past/<int:user_id>", methods=["GET"])
def get_past_jap_events_for_user(user_id: int):
    """Get past jap events for a user.

    Args :
        user_id

    Returns :
        jap_events: list
    """
    jap_events = JapEventService.get_past_jap_events_for_user(user_id)
    return jsonify(jap_events)


@jap_event_blueprint.route("/table/<int:jap_event_id>/<int:user_id>", methods=["GET"])
def get_table_for_user_jap_event(jap_event_id: int, user_id: int):
    """Get table for a user that is in a Jap Event.

    Args :
        jap_event_id

    Returns :
        {
            jap_event: JapEvent,
            table: Table (contains is_emperor field, letting you know if user is emperor or not)
        }
    """
    jap_event = JapEventService.get_jap_event(jap_event_id)

    table = TableService.get_user_table(user_id, jap_event_id)
    if table is None:
        return jsonify({"table": table, "jap_event": jap_event})

    is_user_emperor = table.emperor == user_id
    table = asdict(table)
    table["is_emperor"] = is_user_emperor

    return jsonify({"table": table, "jap_event": jap_event})

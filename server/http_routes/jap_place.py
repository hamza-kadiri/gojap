"""Jap Place blueprint."""

from flask import Blueprint, request, abort
from sqlalchemy import or_
from services.jap_place_services import *
import json

jap_place_blueprint = Blueprint('jap_place_blueprint', __name__, url_prefix='/jap_place')


@jap_place_blueprint.route('', methods=['POST'])
def create_jap_place():
    """Create a new jap place.

    Args :
        data = {name, address, phone, opening_hours, menu_id}

    Returns :
        {name, address, phone, opening_hours, menu_id}
    """
    data = request.json
    old_jap_place = db.session.query(JapPlace).filter(JapPlace.name == data['name']).first()
    if old_jap_place:
       abort(409, f"JapPlace already exists. We do not allow for duplicates.")
    jap_place = create_jap_place_service(data)

    return json.dumps(jap_place.as_dict())


@jap_place_blueprint.route('/all', methods=['GET'])
def get_all_jap_places():
    """Display all jap places.

    Args :
        None

    Returns :
        list of jap places
    """
    jap_places = get_all_jap_places_service()
    dict_jap_places = {}
    for jap_place in jap_places:
        jap_place = jap_place.as_dict()
        dict_jap_places[jap_place['id']] = jap_place
    return dict_jap_places


@jap_place_blueprint.route('', methods=['GET'])
def get_jap_place():
    """Find a given jap_place.

    Args :
        data = {id}

    Returns :
        {name, address, phone, opening_hours, menu_id}
    """
    data = request.json
    jap_place = get_jap_place_service(data)

    if not jap_place:
        abort(404, f"No user with id {data['id']}")
    return json.dumps(jap_place.as_dict())

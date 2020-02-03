"""Jap Place blueprint."""

from flask import Blueprint, request, abort, jsonify

from services.jap_place_services import JapPlaceService
import json

jap_place_blueprint = Blueprint('jap_place_blueprint', __name__, url_prefix='/jap_place')


@jap_place_blueprint.route('', methods=['POST'])
def create_jap_place():
    """Create a new jap place.

    Args :
        data = {name, address, phone, opening_hours, menu_id}

    Returns :
        {jap_place}
    """
    data = request.json
    old_jap_place = JapPlaceService.get_jap_place_by_name(data['name'])
    if old_jap_place:
        abort(409, f"JapPlace already exists. We do not allow for duplicates.")
    jap_place = JapPlaceService.create_jap_place(**data)
    return jsonify(jap_place)


@jap_place_blueprint.route('/all', methods=['GET'])
def get_all_jap_places():
    """Display all jap places.

    Returns :
        list of serialized jap places
    """
    jap_places = JapPlaceService.get_all_jap_places()
    return jsonify({"jap_places" : jap_places})


@jap_place_blueprint.route('<int:jap_place_id>', methods=['GET'])
def get_jap_place(jap_place_id: int):
    """Find a given jap_place.

    Returns :
        {jap_place : name, address, phone, opening_hours, menu_id}
    """
    jap_place = JapPlaceService.get_jap_place(jap_place_id)

    if not jap_place:
        abort(404, f"No user with id {jap_place_id}")
    return jsonify(jap_place)


@jap_place_blueprint.route('/menu/<int:jap_place_id>', methods=['GET'])
def get_jap_place_menu(jap_place_id: int):
    """Find the menu of a given jap_place.

    Returns :
        {menu}
    """
    menu = JapPlaceService.get_jap_place_menu(jap_place_id)

    if not menu:
        abort(404, f"No jap with this id or menu in jap with id {jap_place_id}")
    return jsonify(menu)


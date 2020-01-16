"""Building services for user management."""

from models.model import *


def create_jap_place_service(data):
    """
    Create a new jap_place.

    Args :
        data = {name, adresse, telephone, horaires}
    """
    print("debut")
    jap_place = JapPlace(name=data['name'],
                         adresse=data['adresse'],
                         telephone=data['telephone'],
                         horaires=data['horaires'],
                         menu_id=data['menu_id'])
    db.session.add(jap_place)
    db.session.commit()
    print('ok')
    return jap_place


def get_all_jap_places_service():
    """
    Display all jap places.

    Args :
        None
    """
    places = JapPlace.query.all()
    return places


def get_jap_place_service(data):
    """
    Get jap_place infos.

    Args :
        id : id du jap à get.
    """
    jap_place = JapPlace.query.filter_by(id=data['id']).first()
    return jap_place

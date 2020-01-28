"""Building services for user management."""

from models.model import JapPlace

class JapPlaceService():
    """JapPlaceService Class."""

    @staticmethod
    def create_jap_place(data):
        """
        Create a new jap_place.

        Args :
            data = {name, address, phone, opening_hours}
        """
        jap_place = JapPlace(name=data['name'],
                            address=data['address'],
                            phone=data['phone'],
                            opening_hours=data['opening_hours'],
                            menu_id=data['menu_id'])
        db.session.add(jap_place)
        db.session.commit()
        return jap_place

    @staticmethod
    def get_all_jap_places():
        """
        Display all jap places.

        Args :
            None
        """
        places = JapPlace.query.all()
        return places

    @staticmethod
    def get_jap_place(data):
        """
        Get jap_place infos.

        Args :
            id : id du jap à get.
        """
        jap_place = JapPlace.query.filter_by(id=data['id']).first()
        return jap_place

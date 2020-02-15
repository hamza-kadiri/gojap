"""Building services for user management."""

from models.model import JapPlace, db, Item, Menu, Icon
from typing import Dict, Optional, List


class JapPlaceService:
    """JapPlaceService Class."""

    @staticmethod
    def create_jap_place(
        name: str, address: str, phone: str, opening_hours: str, menu_id: int
    ) -> JapPlace:
        """
        Create a new jap_place.

        Args :
            data = {name, address, phone, opening_hours, menu_id}
        Returns :
            jap_place
        """
        jap_place = JapPlace(
            name=name,
            address=address,
            phone=phone,
            opening_hours=opening_hours,
            menu_id=menu_id,
        )
        db.session.add(jap_place)
        db.session.commit()
        return jap_place

    @staticmethod
    def get_all_jap_places() -> List[JapPlace]:
        """Display all jap places."""
        places = JapPlace.query.all()
        return places

    @staticmethod
    def get_jap_place(jap_place_id: int) -> JapPlace:
        """
        Get jap_place for a given id.

        Args :
            id : jap_place_id.
        """
        jap_place = JapPlace.query.filter_by(id=jap_place_id).first()
        return jap_place

    @staticmethod
    def get_jap_place_menu(jap_place_id: int) -> Optional[JapPlace]:
        """
        Find the menu of a jap_place filtered by its id.

        Args :
            jap_place_id : jap_id.
        """
        jap_place = JapPlace.query.filter_by(id=jap_place_id).first()

        return jap_place.menu if jap_place else None

    @staticmethod
    def create_menu(items: list) -> Menu:
        """
        Create a menu.

        Args :
            items : list of items.
        """
        menu = Menu(items=items)

        db.session.add(menu)
        db.session.commit()
        return menu

    @staticmethod
    def create_item(name: str, points_amount: int, icon_id: int) -> Item:
        """
        Create an item in db.

        Args :
            name : name of the item
            points_amount : points awarded by the item
            icon_id : id of the icon associated
        """
        item = Item(name=name, points_amount=points_amount, icon_id=icon_id)

        db.session.add(item)
        db.session.commit()
        return item

    @staticmethod
    def create_icon(thumbnail_url: int) -> Icon:
        """
        Create an icon in db.

        Args :
            thumbnail_url : url
        """
        icon = Icon(thumbnail_url=thumbnail_url)

        db.session.add(icon)
        db.session.commit()
        return icon

    @staticmethod
    def get_jap_place_by_name(name: str) -> JapPlace:
        """
        Get jap_place for a given name.

        Args :
            name : jap_place name.
        """
        jap_place = JapPlace.query.filter_by(name=name).first()
        return jap_place

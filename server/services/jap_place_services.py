"""Building services for user management."""

from models.model import JapPlace, db, Item, Menu, Icon
from typing import Dict, Optional, List

class JapPlaceService():
    """JapPlaceService Class."""

    @staticmethod
    def create_jap_place(name: str, address: str, phone: str, opening_hours: str, menu_id: int) -> JapPlace:
        """
        Create a new jap_place.

        Args :
            data = {name, address, phone, opening_hours, menu_id}
        Returns :
            jap_place
        """
        jap_place = JapPlace(name=name,
                            address=address,
                            phone=phone,
                            opening_hours=opening_hours,
                            menu_id=menu_id)
        db.session.add(jap_place)
        db.session.commit()
        return jap_place

    @staticmethod
    def get_all_jap_places() -> List[JapPlace]:
        """Display all jap places."""
        places = JapPlace.query.all()
        return places

    @staticmethod
    def get_jap_place(id: int) -> JapPlace:
        """
        Get jap_place infos.

        Args :
            id : jap_id.
        """
        jap_place = JapPlace.query.filter_by(id=id).first()
        return jap_place

    @staticmethod
    def get_jap_place_by_name(name: str) -> JapPlace:
        """Get jap place."""
        jap_place = JapPlace.query.filter_by(name=name).first()
        return jap_place

    @staticmethod
    def create_menu(items: list) -> Menu:
        """Create menu."""
        menu = Menu(items=items)
        db.session.add(menu)
        db.session.commit()
        return menu

    @staticmethod
    def create_item(name: str, points_amount: int, icon_id: int) -> Item:
        """Create item."""
        item = Item(name=name, points_amount=points_amount, icon_id=icon_id)
        db.session.add(item)
        db.session.commit()
        return item

    @staticmethod
    def create_icon(thumbnail_url: int) -> Icon:
        """Create icon."""
        icon = Icon(thumbnail_url=thumbnail_url)
        db.session.add(icon)
        db.session.commit()
        return icon

    @staticmethod
    def get_jap_place_menu(id: int) -> Optional[JapPlace]:
        """
        Get jap_place menu.

        Args :
            id : jap_id.
        """
        jap_place = JapPlace.query.filter_by(id=id).first()

        return jap_place.menu if jap_place else None

"""Select specific things from DB."""

from models.model import db, Menu, JapPlace, JapEvent, Table, item_menus


def get_item_id_from_table_id_and_index(table_id, item_index):
    """Get id of item with table id and index of item in menu."""
    menu_id = (
        db.session.query(Menu.id.label("menu_id"),)
        .join(JapPlace, JapEvent, Table,)
        .filter(
            Menu.id == JapPlace.menu_id,
            JapEvent.jap_place_id == JapPlace.id,
            Table.id == table_id,
        )
        .one()[0]
    )

    item_id, _, _ = (
        db.session.query(item_menus)
        .filter(
            item_menus.c.menu_id == menu_id, item_menus.c.index_in_menu == item_index,
        )
        .one()
    )

    return item_id


def get_item_index_from_table_id_and_id(table_id, item_id):
    """Get index of item in menu with table id and id of item."""
    menu_id = (
        db.session.query(Menu.id.label("menu_id"),)
        .join(JapPlace, JapEvent, Table,)
        .filter(
            Menu.id == JapPlace.menu_id,
            JapEvent.jap_place_id == JapPlace.id,
            Table.id == table_id,
        )
        .one()[0]
    )

    _, _, item_index = (
        db.session.query(item_menus)
        .filter(item_menus.c.menu_id == menu_id, item_menus.c.item_id == item_id,)
        .one()
    )

    return item_index

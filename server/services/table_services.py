"""Building services for table management."""

from models.model import Table, User, db


def create_table_service(data):
    """
    Create a new table.

    Args :
        data = {user_id, jap_event_id}
    """
    table = Table(emperor=data['user_id'],
                  jap_event_id=data['jap_event_id'],
                  status=0)
    db.session.add(table)
    db.session.commit()
    return table


def get_table_service(data):
    """
    Get user infos.

    Args :
        id : id de la table à get.
    """
    table = Table.query.filter_by(id=data['id']).first()
    return table


def remove_table_service(data):
    """
    Delete table.

    Args :
        id : id de la table à delete.

    Return :
        {Table}
    """
    table = Table.query.filter_by(id=data['id']).first()
    if table:
        db.session.delete(table)
        db.session.commit()
        return table
    else:
        return None


def add_user_to_table_service(data):
    """
    Add a user to a table.

    Args :
        id_table : id de la table à get.
        id_user : id de l'user à ajouter.

    Return :
        {Table}
    """
    table = User.query.filter_by(id=data['id']).first()
    user = User.query.filter_by(id=data['user_id']).first()
    table.members.append(user)
    db.session.add(table)
    db.session.commit()

    return table


def set_table_status_service(data):
    """
    Add a user to a table.

    Arg :
        id_table : id de la table à get.
        status : nouveau statut.

    Return :
        {Table}
    """
    table = User.query.filter_by(id=data['id']).first()
    table.status = data['status']

    db.session.commit()

    return table



"""Building services for table management."""
from models.model import Table, User, db, JapEvent, table_members
from sqlalchemy import and_


class TableService:
    """Table Service class."""

    @staticmethod
    def create_table(user_id: int, jap_event_id: int):
        """
        Create a new table.

        Args :
            data = {user_id, jap_event_id}
        """
        table = Table(emperor=user_id,
                      jap_event_id=jap_event_id,
                      status=0)
        db.session.add(table)
        db.session.commit()
        return table

    @staticmethod
    def get_table(table_id):
        """
        Get user infos.

        Args :
            id : id de la table à get.
        """
        table = Table.query.filter_by(id=table_id).first()
        return table

    @staticmethod
    def remove_table(data):
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

    @staticmethod
    def add_user_to_table(table_id: int, user_ids):
        """
        Add a user to a table.

        Args :
            id_table : id de la table à get
            user_ids : liste des users a rajouter

        Return :
            {Table}
        """
        table = Table.query.filter_by(id=table_id).first()

        members = User.query.filter(
            User.id.in_(user_ids)
        ).all()

        for member in members:
            if member not in table.members:
                table.members += members

        db.session.add(table)
        db.session.commit()

        return table

    @staticmethod
    def set_table_status(table_id: int, status: int):
        """
        Update status of a table.

        Arg :
            table_id : id de la table à get.
            status : new status

        Return :
            {Table}
        """
        table = Table.query.filter_by(id=table_id).first()
        table.status = status

        db.session.commit()

        return table

    @staticmethod
    def get_user_table(user_id: int):
        """
        Get a user table.

        Arg :
            user_id : id du user

        Return :
            {Table}
        """
        table_id = db.session.query(table_members).filter(table_members.c.user_id == user_id).one().table_id
        table = Table.query.filter_by(id=table_id).first()

        return table

"""Building services for table management."""

from models.model import Table, User, db


class TableService():
    """Table Service class."""

    @staticmethod
    def create_table(data):
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

    @staticmethod
    def get_table(data):
        """
        Get user infos.

        Args :
            id : id de la table à get.
        """
        table = Table.query.filter_by(id=data['id']).first()
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
    def add_user_to_table(data):
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

    @staticmethod
    def set_table_status(data):
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

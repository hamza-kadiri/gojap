"""Building services for table management."""
import sqlalchemy

from models.model import Table, User, db, JapEvent, table_members, CommandItem, UserCommand
from sqlalchemy import and_
from services.command_service import CommandService


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
        member = User.query.filter(
            User.id.__eq__(user_id)
        ).first()
        table.members.append(member)
        db.session.add(table)
        db.session.commit()
        table_id = table.id
        command = CommandService.create_command(1, table_id)
        table.current_command_id = command.id
        db.session.add(table, command)
        db.session.commit()
        return table

    @staticmethod
    def get_table(table_id):
        """
        Get a table.

        Args :
            id : table_id .
        """
        table = Table.query.filter_by(id=table_id).first()
        return table

    @staticmethod
    def set_current_command_id(table_id: int, current_command_id: int):
        """
        Set the new current command ID when the emperor changes the item.

        Args :
            data = {table_id, current_command_id}
        """
        table = TableService.get_table(table_id)
        table.current_command_id = current_command_id
        db.session.add(table)
        db.session.commit()
        return table

    @staticmethod
    def remove_table(id: int):
        """
        Delete table.

        Args :
            id : table_id.

        Return :
            {Table}
        """
        table = Table.query.filter_by(id=id).first()
        if table:
            # solution qui a l'air de marcher : table = Table.query.filter_by(id=id).delete()
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
            id_table : id of the table
            user_ids : list of users to add

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
            table_id : id of the table
            status : new status

        Return :
            {Table}
        """
        table = Table.query.filter_by(id=table_id).first()
        table.status = status

        db.session.commit()

        return table

    @staticmethod
    def get_user_table(user_id: int, jap_event_id: int):
        """
        Get a user's table.

        Arg :
            user_id : id of the user
            jap_event_id

        Return :
            {Table}
        """
        tables = JapEvent.query.filter(
            JapEvent.id.__eq__(jap_event_id)
        ).first().tables
        table_ids = []
        for table in tables:
            table_ids.append(table.id)
        try:
            table_id = db.session.query(table_members).filter(
                and_(table_members.c.user_id == user_id,
                     table_members.c.table_id.in_(table_ids))
            ).first().table_id
            table = Table.query.filter_by(id=table_id).first()
        except sqlalchemy.orm.exc.NoResultFound:
            table = None
        return table

    @staticmethod
    def is_emperor(user_id, table_id):
        """Check if a user is emperor."""
        table = Table.query.get(table_id)
        return True
        return table.emperor == user_id

    @staticmethod
    def get_table_stats(table_id: int) -> dict:
        """Generate statistics for the desired table.

        Arg :
            table_id : id de la table à get.

        Return:
            {Stats}
        """
        pneu_id = 12
        sushi_id = 15

        pneu = db.session.query(db.func.sum(UserCommand.order_amount).label("accumulated")). \
            filter(UserCommand.command_id == CommandItem.id). \
            filter(CommandItem.table_id == table_id). \
            filter(CommandItem.item_id == pneu_id).first()

        sushi = db.session.query(db.func.sum(UserCommand.order_amount).label("accumulated")). \
            filter(UserCommand.command_id == CommandItem.id). \
            filter(CommandItem.table_id == table_id). \
            filter(CommandItem.item_id == pneu_id).first()

        montant = (db.session.query(db.func.count(Table.members).label("number_of_members")).
                   filter(Table.table_id == table_id).first()) * 12

        calories = (db.session.query(db.func.sum(UserCommand.order_amount).label("accumulated")).
                    filter(UserCommand.command_id == CommandItem.id).
                    filter(CommandItem.table_id == table_id).first()) * 60

        stats = {
            'nbre_de_sushi': sushi,
            'nbre_pneu': pneu,
            'montant': montant,
            'calories': calories
        }

        return stats

"""Building services for table management."""
from typing import Optional
from models.model import (
    Table,
    User,
    db,
    CommandItem,
    UserCommand,
)
from services.command_service import CommandService


class TableService:
    """Table Service class."""

    @staticmethod
    def create_table(user_id: int, jap_event_id: int) -> Table:
        """
        Create a new table.

        Args :
            data = {user_id, jap_event_id}
        """
        table = Table(emperor=user_id,
                      jap_event_id=jap_event_id,
                      status=0)

        member = User.query.filter(User.id.__eq__(user_id)).first()
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
    def get_table(table_id: int) -> Table:
        """
        Get a table by its id.

        Args :
            id : table_id .
        """
        table = Table.query.filter_by(id=table_id).first()
        return table

    @staticmethod
    def remove_table(table_id: int) -> Optional[Table]:
        """
        Delete table.

        Args :
            table_id : table_id.

        Return :
            {Table}
        """
        table = Table.query.filter_by(id=table_id).first()
        if table:
            db.session.delete(table)
            db.session.commit()
            return table
        else:
            return None

    @staticmethod
    def add_users_to_table(table_id: int, user_ids: list) -> Table:
        """
        Add a user to a table.

        Args :
            id_table : id of the table
            user_ids : list of users to add

        Return :
            {Table}
        """
        table = Table.query.filter_by(id=table_id).first()

        members = User.query.filter(User.id.in_(user_ids)).all()

        for member in members:
            if member not in table.members:
                table.members += members

        db.session.add(table)
        db.session.commit()

        return table

    @staticmethod
    def set_table_status(table_id: int, status: int) -> Table:
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
    def get_user_table(user_id: int, jap_event_id: int) -> Optional[Table]:
        """
        Get a user's table associated to a jap event.

        Arg :
            user_id : id of the user
            jap_event_id

        Return :
            {Table}
        """
        return (
            Table.query.filter_by(jap_event_id=jap_event_id)
            .filter(Table.members.any(User.id.in_([user_id])))
            .first()
        )

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

        pneu = (
            db.session.query(db.func.sum(UserCommand.order_amount).label("accumulated"))
            .filter(UserCommand.command_id == CommandItem.id)
            .filter(CommandItem.table_id == table_id)
            .filter(CommandItem.item_id == pneu_id)
            .first()[0]
        )

        if pneu is None:
            pneu = 0

        sushi = (
            db.session.query(db.func.sum(UserCommand.order_amount).label("accumulated"))
            .filter(UserCommand.command_id == CommandItem.id)
            .filter(CommandItem.table_id == table_id)
            .filter(CommandItem.item_id == sushi_id)
            .first()[0]
        )

        if sushi is None:
            sushi = 0

        participants = (
            db.session.query(Table)
            .join(Table.members)
            .filter(Table.id == table_id)
            .count()
        )

        items = (
            db.session.query(db.func.sum(UserCommand.order_amount).label("accumulated"))
            .filter(UserCommand.command_id == CommandItem.id)
            .filter(CommandItem.table_id == table_id)
            .first()[0]
        )

        if items is None:
            items = 0

        stats = {
            "nbr_of_items": items,
            "nbre_de_sushi": sushi,
            "nbre_pneu": pneu,
            "montant": participants * 12,
            "calories": items * 60,
        }

        return stats

    @staticmethod
    def is_emperor(user_id: int, table_id: int) -> bool:
        """Check if a user is emperor."""
        table = Table.query.get(table_id)
        return table.emperor == user_id

    @staticmethod
    def set_current_command_id(table_id: int, current_command_id: int) -> Table:
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

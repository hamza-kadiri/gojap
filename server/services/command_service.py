"""Building services for table management."""

from models.model import UserCommand, db, User, CommandItem
from sqlalchemy.exc import IntegrityError


class CommandService():
    """Command service."""

    @staticmethod
    def create_command(item_id, table_id):
        """
        Create a new command for an item.

        Args :
            data = {item_id, table_id}
        """
        try:
            command = CommandItem(item_id=item_id, table_id=table_id)
            db.session.add(command)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return CommandItem.query.filter_by(table_id=table_id, item_id=item_id).first()
        return command

    @staticmethod
    def get_command(command_id):
        """
        Get command by id.

        Args :
            data = {command_id}
        """
        command = CommandItem.query.filter_by(id=command_id).first()
        return command

    @staticmethod
    def get_command_by_table_id(table_id):
        """
        Get command by table id.

        Args :
            data = {table_id}
        """
        commands = CommandItem.query.filter_by(table_id=table_id).all()
        return commands

    @staticmethod
    def add_user_order_to_command(command_id, user_id, item_id, order_amount):
        """
        Add a new item to the command of a user.

        Args :
            data = {command_id, user_id, item_id, order_amount}
        """
        user = db.session.query(User).get(user_id)
        user_command = UserCommand.query.filter_by(
            user_id=user_id, command_id=command_id).first()
        if (user_command):
            user_command.order_amount = order_amount
            command = CommandItem.query.filter_by(id=command_id).first()
        else:
            user_command = UserCommand(user=user, order_amount=order_amount)
            command = CommandItem.query.filter_by(id=command_id).first()
            command.users.append(user_command)

        try:
            db.session.merge(command)
            db.session.commit()
            pass
        except IntegrityError:
            db.session.rollback()

        return command

    @staticmethod
    def get_accumulated_order_amount(command_id):
        """
        Get accumulated order amount for a command.

        Args :
            data = {command_id}
        """
        accumulated = db.session.query(
            db.func.sum(UserCommand.order_amount).label("accumulated")).group_by(UserCommand.command_id).filter_by(command_id=command_id).first()

        return accumulated[0]

    @staticmethod
    def get_all_command_by_table_id(table_id):
        """
        Get all commands for a table.

        Args :
            data = {table_id}
        """
        command = UserCommand.query.filter_by(table_id=table_id).all()
        return command

    @staticmethod
    def get_command_by_user(data):
        """
        Get command for a user in a table.

        Args :
            data = {user_id, table_id}
        """
        command = UserCommand.query.filter_by(table_id=data['table_id'],
                                              user_id=data['user_id']).all()
        return command

    @staticmethod
    def get_unique_command_by_table_id_and_item_id(table_id,item_id):
        """
        Get unique command for a table and an item.

        Args :
            data = {table_id, item_id}
        """
        print("hello")
        command = CommandItem.query.filter_by(table_id=table_id,item_id=item_id).first()
        print(command)
        return command


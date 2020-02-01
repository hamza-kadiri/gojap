"""Building services for table management."""

from models.model import UserCommand, db, User, CommandItem


class CommandService():
    """Command service."""

    @staticmethod
    def create_command(item_id, table_id):
        """
        Create a new command for an item.

        Args :
            data = {item_id, table_id}
        """
        command = CommandItem(item_id=item_id, table_id=table_id)
        db.session.add(command)
        db.session.commit()
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
        user = User.query.filter_by(id=user_id).first()
        item_command = UserCommand(user=user, order_amount=order_amount)
        command = CommandItem.query.filter_by(id=command_id).first()
        print(command.users)
        command.users.append(item_command)
        db.session.add(command)
        db.session.commit()
        return command

    @staticmethod
    def get_all_command_by_table_id(table_id):
        """
        Get all commands for a table.

        Args :
            data = {table_id}
        """
        command = CommandUser.query.filter_by(table_id=table_id).all()
        return command

    @staticmethod
    def get_command_by_user(data):
        """
        Get command for a user in a table.

        Args :
            data = {user_id, table_id}
        """
        command = CommandUser.query.filter_by(table_id=data['table_id'],
                                              user_id=data['user_id']).all()
        return command

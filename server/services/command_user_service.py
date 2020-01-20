"""Building services for table management."""

from models.model import CommandUser, db, Item

class CommandUserService():
    """Command User service"""

    def create_command_user(data):
        """
        Create a new command for a user.

        Args :
            data = {user_id, table_id}
        """
        command = CommandUser(user_id=data['user_id'],
                            table_id=data['table_id'])
        db.session.add(command)
        db.session.commit()
        return command


    def get_command_user(data):
        """
        Get command for a user.

        Args :
            data = {command_id}
        """
        command = CommandUser.query.filter_by(id=data['id']).first()
        return command


    def add_item_to_command(data):
        """
        Add a new item to the command of a user.

        Args :
            data = {command_id, table_id}
        """
        command = CommandUser.query.filter_by(id=data['command_id']).first()
        item = Item.query.filter_by(id=data['item_id']).first()
        command.items.append(item)
        db.session.add(command)
        db.session.commit()

        return command


    def get_all_command_table(data):
        """
        Get all commands for a table.

        Args :
            data = {table_id}
        """
        command = CommandUser.query.filter_by(table_id=data['table_id']).all()
        return command


    def get_command_by_user(data):
        """
        Get command for a user in a table.

        Args :
            data = {user_id, table_id}
        """
        command = CommandUser.query.filter_by(table_id=data['table_id'],
                                            user_id=data['user_id']).all()
        return command


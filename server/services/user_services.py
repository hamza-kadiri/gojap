"""Building services for user management."""

from models.model import *


def create_user_service(data):
    """
    Create a new user.

    Args :
        data = {pseudo, email, phone}
    """
    user = User(pseudo=data['pseudo'],
                email=data['email'],
                phone=data['phone'],
                calorie=0)
    db.session.add(user)
    db.session.commit()

    return user


def get_user_service(data):
    """
    Get user infos.

    Args :
        id : id de l'user à get.
    """
    user = User.query.filter_by(id=data['id']).first()
    return user


def remove_user_service(data):
    """
    Delete user.

    Args :
        id : id de l'user à delete.
    """
    user = User.query.filter_by(id=data['id']).first()

    if user:
        db.session.delete(user)
        db.session.commit()
        return user
    else:
        return None


def get_all_users_service():
    """
    Display all users.

    Args :
        None
    """
    users = User.query.all()
    return users

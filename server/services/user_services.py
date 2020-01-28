"""Building services for user management."""
from flask import abort
from models.model import db, User
from sqlalchemy import or_
from helpers import json_abort


class UserService():
    """UserService class."""

    @staticmethod
    def create_user(username, email, phone, avatar_url):
        """
        Create a new user.

        Args :
            data = {username, email, phone}
        """
        old_user = db.session.query(User).filter(
            or_(User.email == email, User.phone == phone)).first()
        if old_user:
            json_abort(
                409, f"User already exists. We do not allow for duplicate phones, emails, or usernames.")
        user = User(username=username,
                    email=email,
                    phone=phone,
                    avatar_url=avatar_url,
                    calorie=0)
        db.session.add(user)
        db.session.commit()

        return user

    @staticmethod
    def get_user(user_id):
        """
        Get user infos.

        Args :
            id : id de l'user à get.
        """
        user = User.query.filter_by(id=user_id).first()
        print(user.jap_events)
        return user

    @staticmethod
    def remove_user(user_id):
        """
        Delete user.

        Args :
            id : id de l'user à delete.
        """
        user = User.query.filter_by(id=user_id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            return user
        else:
            return None

    @staticmethod
    def get_all_users():
        """
        Display all users.

        Args :
            None
        """
        users = User.query.all()
        return users

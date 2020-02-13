"""Building services for user management."""

from typing import Dict, Optional, List
from flask import abort
from models.model import db, User, UserCommand, CommandItem, Table, JapEvent
from sqlalchemy import or_
from helpers import json_abort


class UserService:
    """UserService class."""

    @staticmethod
    def create_user(username: str, email: str, phone: str, avatar_url: str) -> User:
        """
        Create a new user.

        Args :
            data = {username, email, phone, avatar_url}
        """
        old_user = (
            db.session.query(User)
            .filter(or_(User.email == email, User.phone == phone))
            .first()
        )
        if old_user:
            json_abort(
                409,
                f"User already exists. We do not allow for duplicate phones, emails, or usernames.",
            )
        user = User(
            username=username,
            email=email,
            phone=phone,
            avatar_url=avatar_url,
            calorie=0,
        )
        db.session.add(user)
        db.session.commit()

        return user

    @staticmethod
    def get_user(user_id: int) -> User:
        """
        Get user infos.

        Args :
            id : id of the user
        """
        user = User.query.filter_by(id=user_id).first()
        return user

    @staticmethod
    def get_user_by_name(user_name: str) -> User:
        """
        Get user infos with the name given.

        Args :
            user_name : name of the user to get.
        """
        user = User.query.filter_by(username=user_name).first()
        return user

    @staticmethod
    def remove_user(user_id: int) -> Optional[User]:
        """
        Delete user.

        Args :
            id : id of the user to delete.
        """
        user = User.query.filter_by(id=user_id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            return user
        else:
            return None

    @staticmethod
    def get_all_users() -> List[User]:
        """Display all users."""
        users = User.query.all()
        return users

    @staticmethod
    def get_user_stats(user_id: int) -> dict:
        """Get stats for a given user.

        Arg :
            - user_id : user for whom we need the stats

        Return :
            - {stat : value}
        """
        nbr_of_japs = (
            db.session.query(JapEvent)
            .join(JapEvent.members)
            .filter(User.id == user_id)
            .count()
        )

        pneu_id = 12
        pneu = (
            db.session.query(db.func.sum(UserCommand.order_amount).label("accumulated"))
            .filter(UserCommand.command_id == CommandItem.id)
            .filter(UserCommand.user_id == user_id)
            .filter(CommandItem.item_id == pneu_id)
            .first()[0]
        )

        if pneu is None:
            pneu = 0

        items = (
            db.session.query(db.func.sum(UserCommand.order_amount).label("accumulated"))
            .filter(UserCommand.command_id == CommandItem.id)
            .filter(UserCommand.user_id == user_id)
            .first()
        )[0]

        if items is None:
            items = 0

        stats = {
            "nbr_of_items": items,
            "nbr_of_japs": nbr_of_japs,
            "nbr_of_cals": items * 60,
            "nbr_of_pneu": pneu,
        }
        return stats

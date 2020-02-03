from services import UserService


class AuthService:
    """A service used to log in to the app."""

    @staticmethod
    def login(username):
        """Logs a user in, using his username.

        Args :
            username: string
        """
        user = UserService.get_user_by_name(username)
        if not user:
            return AuthService.register(username)
        return user

    @staticmethod
    def register(username):
        """Registers a new user, with his username.

        Args :
            username: string
        """
        user = UserService.create_user(username, username, username, None)
        return user

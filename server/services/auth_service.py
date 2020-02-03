from services import UserService


class AuthService:
    """A service used to log in to the app."""
    @staticmethod
    def login(username):
        user = UserService.get_user_by_name(username)
        if not user:
            return AuthService.register(username)
        return user

    @staticmethod
    def register(username):
        user = UserService.create_user(username, username, username, None)
        return user

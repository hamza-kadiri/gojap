class Config(object):
    """DB Base config."""
    DB_SERVER = 'db'
    DB_USER = 'admin'
    DB_PASSWORD = 'password'
    DB_NAME = 'gojap'
    DATABASE_URI = 'postgresql://{}:{}@{}/{}'.format(
        DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME)
    DROP_ON_INIT = True

    """API Config"""

    """Auth Config"""

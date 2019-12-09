"""Config file."""


class Config(object):
    """DB Base config."""
#     host = "localhost"
#     port = "5432"
#     DB_SERVER = 'db'
#     DB_USER = 'admin'
#     DB_PASSWORD = 'password'
#     DB_NAME = 'gojap'
#     SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@{}/{}'.format(
#         DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME)
# #    DROP_ON_INIT = True
#     SQLALCHEMY_TRACK_MODIFICATIONS = False

    DB_SERVER = '0.0.0.0'
    DB_USER = 'admin'
    DB_PASSWORD = 'password'
    DB_NAME = 'gojap'
    SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@{}/{}'.format(
        DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME)
    SQLALCHEMY_TRACK_MODIFICATIONS = True

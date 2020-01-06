"""Config file."""


class Config(object):
    """DB Base config.

    host = "localhost"
    port = "5432"
    DB_SERVER = 'db'
    DB_USER = 'admin'
    DB_PASSWORD = 'password'
    DB_NAME = 'gojap'
    SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@{}/{}'.format(
        DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME
    )
    DROP_ON_INIT = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    """

    DB_SERVER = '0.0.0.0'
    DB_USER = 'admin'
    DB_PASSWORD = 'password'
    DB_NAME = 'gojap'
    SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@{}/{}'.format(
        DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME)
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    YELP_BEARER_TOKEN = '9QUr4h4dpmNRs42nScaTD3bRZMnVvSV9oMqQ5moZZ3deAcpHC2ccuwhEdQnxTwBeby9ezCADeZEYV7tsCmTxZm3csDIM5NFisjxizCr8k36hJCi2xJGKXnCTjzvkXXYx'
    UNSPLASH_CLIENT_ID = '75ed61a96d5bcfb22dd5f0f4c3b083a2c0fcd3969b5509b0b1d435aaa32bc3a3'

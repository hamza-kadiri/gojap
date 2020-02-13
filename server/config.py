"""Config file."""
import os
from dotenv import load_dotenv

load_dotenv()


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

    DB_SERVER = os.getenv("DB_SERVER") if os.getenv("DB_SERVER") else "0.0.0.0"
    DB_USER = os.getenv("DB_USER") if os.getenv("DB_USER") else "admin"
    DB_PASSWORD = os.getenv("DB_PASSWORD") if os.getenv("DB_PASSWORD") else "password"
    DB_NAME = os.getenv("DB_NAME") if os.getenv("DB_NAME") else "gojap"
    SQLALCHEMY_DATABASE_URI = "postgresql://{}:{}@{}/{}".format(
        DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    SECRET_KEY = b"\xb0eS\xc6\x8cN9\n\xbaz\x15_\x1f\xed8Z\x80x+\xbb\xbc\x02>"

    YELP_BEARER_TOKEN = "9QUr4h4dpmNRs42nScaTD3bRZMnVvSV9oMqQ5moZZ3deAcpHC2ccuwhEdQnxTwBeby9ezCADeZEYV7tsCmTxZm3csDIM5NFisjxizCr8k36hJCi2xJGKXnCTjzvkXXYx"
    UNSPLASH_CLIENT_ID = (
        "75ed61a96d5bcfb22dd5f0f4c3b083a2c0fcd3969b5509b0b1d435aaa32bc3a3"
    )
    VIAREZO_CLIENT_ID = "0fe7b6b60d9fc97fde717f6b4a77d45ea057322c"
    VIAREZO_CLIENT_SECRET = "b8c46ab325cdc23045e605b1356eef6f0fcb1a98"
    VIAREZO_AUTH_URL = "https://auth.viarezo.fr/oauth/authorize"
    VIAREZO_TOKEN_URL = "https://auth.viarezo.fr/oauth/token"
    VIAREZO_BASE_URL = "https://auth.viarezo.fr/api/"
    VIAREZO_ME_PATH = "user/show/me"
    VIAREZO_CALLBACK_URL = "https://go-jap.herokuapp.com/"

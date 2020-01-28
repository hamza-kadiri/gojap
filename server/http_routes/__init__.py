"""Init."""

from .base import base_blueprint
from .auth import auth_blueprint
from .user import user_blueprint
from .oauth import construct_oauth_blueprint
from .jap_event import jap_event_blueprint
from .table import table_blueprint
from .jap_place import jap_place_blueprint
from .command import command_blueprint

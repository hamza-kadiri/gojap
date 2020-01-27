"""Error handlers."""
from flask import jsonify
from .response_formaters import json_abort


def init_error_handlers(app):
    """Initialize eroor handlers."""
    @app.errorhandler(400)
    def bad_request_error(error):
        return json_abort(400, "Bad Request")

    @app.errorhandler(401)
    def bad_credentials_error(error):
        return json_abort(401, "Bad credentials")

    @app.errorhandler(403)
    def forbidden_error(error):
        return json_abort(403, "This operation is forbidden")

    @app.errorhandler(404)
    def not_found_error(error):
        return json_abort(404, 'The ressource you have requested could not be found')

    @app.errorhandler(500)
    def internal_server_error(error):
        return json_abort(500, 'Internal Server Error')

    # @app.errorhandler(Exception)
    # def unhandled_exception(error: Exception):
    #     app.logger.error(error)
    #     return json_abort(500, f"Unhandled Exception: {error}")

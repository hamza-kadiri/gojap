"""Format responses."""
from flask import jsonify, abort


def json_abort(status_code, message):
    """
    JSON abort function.

    return formated json with status_code and message.
    """
    data = {"error": {"code": status_code, "message": message}}
    response = jsonify(data)
    response.status_code = status_code
    return response

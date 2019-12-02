"""App."""

from flask import Flask, config, jsonify
from flask_cors import CORS
import logging


def create_app():
    """Create and the app."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')
    # Set CORS
    CORS(app)

    with app.app_context():
        @app.route("/", methods=['GET'])
        def index():
            return jsonify("Hello World")

    return app


application = create_app()

if __name__ == "__main__":
    application.run(host="0.0.0.0", port=80)

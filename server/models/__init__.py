"""App."""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS



def create_app():
    """Create and the app."""
    app = Flask(__name__, instance_relative_config=False)
    db = SQLAlchemy(app)

    app.config.from_object('server.config.Config')
    # Set CORS
    #  CORS(app)

    with app.app_context():
        db.init_app(app)
        db.create_all()
        # @app.route("/", methods=['GET'])
        # def index():
        # return jsonify("Hello World")

        return app


application = create_app()


if __name__ == "__main__":
    application.run(host="0.0.0.0", port=80)

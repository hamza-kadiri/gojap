"""App."""

from flask import Flask, config, jsonify
from flask_cors import CORS
import logging
from flask_sqlalchemy import SQLAlchemy
import psycopg2


def create_app():
    """Create and the app."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('server.config.Config')
    # Set CORS
    # CORS(app)
    db = SQLAlchemy(app)

    with app.app_context():
        @app.route("/", methods=['GET'])
        def index():
            return jsonify("Hello World")

    return app, db


application, db = create_app()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pseudo = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(12), unique=True, nullable=False)
    # jap_event = db.Column(db.String(120), unique=True, nullable=False)
    # achievements = db.Column(db.String(120), unique=True, nullable=False)
    calorie = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username


# db.create_all()

if __name__ == "__main__":
    db.create_all()
    application.run(host="0.0.0.0", port=80)


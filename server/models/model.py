"""User Model."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """User Model for DB interactions."""

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    pseudo = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(12), unique=True, nullable=False)
    # jap_event = db.Column(db.String(120), unique=True, nullable=False)
    # achievements = db.Column(db.String(120), unique=True, nullable=False)
    calorie = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        """Representation method."""
        return '<User %r>' % self.pseudo

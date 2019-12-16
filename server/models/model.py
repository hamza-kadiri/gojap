"""User Model."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """User Model for DB interactions."""

    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    pseudo = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    phone = db.Column(db.String(12), unique=True, nullable=False)
    # jap_event = db.Column(db.String(120), unique=True, nullable=False)
    # achievements = db.Column(db.String(120), unique=True, nullable=False)
    calorie = db.Column(db.Integer, unique=False, nullable=True)

    def __repr__(self):
        """Representation method."""
        return '<User %r>' % self.pseudo

class JapEvent(db.Model):
    __tablename__ = 'jap_event'
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(200), unique=False, nullable=True)
    date = db.Column(db.DateTime(), unique=False, nullable=False)
    jap_place_id = db.Column(db.Integer, db.ForeignKey('jap_place.id'),
                             nullable=False)
    photo_ids = db.relationship('Photo', backref='jap_event', lazy=True)
    event_ids = db.relationship('Event', backref='jap_event', lazy=True)
    #Users

    def __repr__(self):
        return '<JapEvent %r>' % self.nom

class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), unique=False, nullable=True)
    jap_event_id = db.Column(db.Integer, db.ForeignKey('jap_event.id'),
                             nullable=False)

    #users
    def __repr__(self):
        return '<Event %r>' % self.id

class JapPlace(db.Model):
    __tablename__ = 'jap_place'
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(80), unique=False, nullable=False)
    adresse = db.Column(db.String(200), unique=False, nullable=False)
    telephone = db.Column(db.String(80), unique=False, nullable=True)
    horaires = db.Column(db.String(80), unique=False, nullable=True)
    jap_event_ids = db.relationship('JapEvent', backref='jap_place', lazy=True)

    def __repr__(self):
        return '<JapPlace %r>' % self.nom

class Photo(db.model):
    __tablename__ = 'photos'
    id = db.Column(db.Integer, primary_key=True)
    jap_place_id = db.Column(db.Integer, db.ForeignKey('jap_event.id'),
                             nullable=False)


class Icon(db.Model):
    _tablename_ = 'icon'
    id = db.Column(db.Integer, primary_key=True)
    item_associated = db.relationship('Items', backref='icon')


class Item(db.Model):
    _tablename_ = 'item'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    points_amount = db.Column(db.Integer, nullable=False)
    icon_id = db.Column(db.Integer, db.ForeignKey('icons.id'), nullable=False)


items_command = db.Table('items_command',
                         db.Column('item_id', db.Integer, db.ForeignKey('item.id'), primary_key=True),
                         db.Column('command_id', db.Integer, db.ForeignKey('command_user.id'), primary_key=True)
                         )


class CommandUser(db.Model):
    _tablename_ = 'command_user'
    id = db.Column(db.Integer, primary_key=True)
    items = db.relationship('Item', secondary=items_command, lazy='subquery',
                            backref=db.backref('command_users', lazy=True))
    table_id = db.Column(db.Integer, db.ForeignKey('table.id'), nullable=False)


items_menu = db.Table('items_menu',
                      db.Column('item_id', db.Integer, db.ForeignKey('item.id'), primary_key=True),
                      db.Column('menu_id', db.Integer, db.ForeignKey('menu.id'), primary_key=True)
                      )


class Menu(db.Model):
    _tablename_ = 'menu'
    id = db.Column(db.Integer, primary_key=True)
    items = db.relationship('Item', secondary=items_menu, lazy='subquery',
                            backref=db.backref('menus', lazy=True))


class Table(db.Model):
    _tablename_ = 'table'
    id = db.Column(db.Integer, primary_key=True)
    emperor = db.Column(db.String(120), nullable=False)
    command_user_id = db.relationship('CommandUser', backref='command_user', lazy=True)
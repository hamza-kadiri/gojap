"""Database Model."""

from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass

import datetime

db = SQLAlchemy()

user_achievements = db.Table('user_achievements',
                             db.Column('user_id', db.Integer, db.ForeignKey(
                                 'user.id'), primary_key=True),
                             db.Column('achievement_id', db.Integer, db.ForeignKey(
                                 'achievement.id'), primary_key=True)
                             )


def format_attribute(obj, name):
    """
    Format attribute.

    Returns the formatted value of an object's attribute.
    """
    attr = getattr(obj, name)
    if isinstance(attr, datetime.datetime):
        return attr.__str__()
    else:
        return attr


jap_event_members = db.Table('jap_event_members',
                             db.Column('jap_event_id', db.Integer, db.ForeignKey(
                                 'jap_event.id'), primary_key=True),
                             db.Column('user_id', db.Integer, db.ForeignKey(
                                 'user.id'), primary_key=True)
                             )


@dataclass
class User(db.Model):
    """
    Defines a new user in the database.

    Defined variables :
        {id, username, email, phone, calorie, jap_events, achievments}
    """

    id: int
    username: str
    email: str
    phone: str
    calorie: int
    avatar_url: str
    achievements: list

    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=True)
    phone = db.Column(db.String(12), unique=False, nullable=True)
    calorie = db.Column(db.Integer, unique=False, nullable=True)
    avatar_url = db.Column(db.String(120), nullable=True)
    achievements = db.relationship('Achievement', secondary=user_achievements, lazy='subquery',
                                   backref=db.backref('user', lazy=True))

    def __repr__(self):
        """Representation method."""
        return '<User %r>' % self.username


@dataclass
class JapEvent(db.Model):
    """
    Defines a new JapEvent in the database.

    Defined variables :
        {id, userName, description, date, jap_place_id,
            photo_ids, event_ids,table_ids, members}
    """

    id: int
    event_name: str
    description: str
    date: datetime.datetime
    created_at: datetime.datetime
    created_by: int
    jap_place_id: int
    status: int
    tables: list
    members: list

    __tablename__ = 'jap_event'
    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(200), unique=False, nullable=True)
    date = db.Column(db.DateTime(), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(), unique=False,
                           nullable=True, default=datetime.datetime.now())
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    jap_place_id = db.Column(db.Integer, db.ForeignKey('jap_place.id'),
                             nullable=False)
    status = db.Column(db.Integer, nullable=False, default=0)
    photos = db.relationship('Photo', backref='jap_event', lazy=True)
    events = db.relationship('Event', backref='jap_event', lazy=True)
    tables = db.relationship('Table', backref='jap_event', lazy=True)
    members = db.relationship('User', secondary=jap_event_members, lazy=True,
                              backref=db.backref('jap_events', lazy=True))

    def __repr__(self):
        """Representation method."""
        return '<JapEvent %r>' % self.event_name


event_members = db.Table('event_members',
                         db.Column('event_id', db.Integer, db.ForeignKey(
                             'event.id'), primary_key=True),
                         db.Column('user_id', db.Integer, db.ForeignKey(
                             'user.id'), primary_key=True)
                         )


@dataclass
class Achievement(db.Model):
    """
    Defines a new Achievment in the database.

    Defined variables :
        {id, name, image, condition}
    """

    id: int
    name: str
    image: str
    condition: str

    __tablename__ = 'achievement'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=True)
    image = db.Column(db.String(120), unique=False, nullable=True)
    condition = db.Column(db.String(120), unique=False, nullable=True)

    def __repr__(self):
        """Representation method."""
        return '<Achievement %r>' % self.name


class Event(db.Model):
    """
    Defines a new Event in the database.

    Defined variables :
        {id, description, jap_event_id, users}
    """

    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), unique=False, nullable=True)
    jap_event_id = db.Column(db.Integer, db.ForeignKey(
        'jap_event.id'), nullable=False)
    users = db.relationship('User', secondary=event_members, lazy='subquery',
                            backref=db.backref('events', lazy=True))

    def __repr__(self):
        """Representation method."""
        return '<Event %r>' % self.id


@dataclass
class JapPlace(db.Model):
    """
    Defines a new JapPlace in the database.

    Defined variables :
        {id, name, addresse, phone, opening_hourss, jap_event_ids, menu_id}
    """
    menu: Menu
    id: int
    name: str
    address: str
    phone: str
    opening_hours: str
    jap_events: list
    menu_id: int

    __tablename__ = 'jap_place'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    address = db.Column(db.String(200), unique=False, nullable=False)
    phone = db.Column(db.String(80), unique=False, nullable=True)
    opening_hours = db.Column(db.String(80), unique=False, nullable=True)
    jap_events = db.relationship('JapEvent', backref='jap_place', lazy=True)
    menu_id = db.Column(db.Integer, db.ForeignKey('menu.id'), nullable=False)

    def __repr__(self):
        """Representation method."""
        return '<JapPlace %r>' % self.name


@dataclass
class Photo(db.Model):
    """
    Defines a new Photo in the database.

    Defined variables :
        {id, jap_event_id}
    """

    id: int
    jap_event_id: int

    __tablename__ = 'photos'
    id = db.Column(db.Integer, primary_key=True)
    jap_event_id = db.Column(db.Integer, db.ForeignKey(
        'jap_event.id'), nullable=False)


class Item(db.Model):
    """
    Defines a new Item in the database.

    Defined variables :
        {id, name, points_amount, icon_id}
    """

    _tablename_ = 'item'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    points_amount = db.Column(db.Integer, nullable=False)
    icon_id = db.Column(db.Integer, db.ForeignKey('icon.id'), nullable=False)


@dataclass
class Icon(db.Model):
    """
    Defines a new Icon in the database.

    Defined variables :
        {id, associated_item}
    """

    id: int
    thumbnail_url: int
    associated_item = Item

    _tablename_ = 'icon'
    id = db.Column(db.Integer, primary_key=True)
    thumbnail_url = db.Column(db.String(120), nullable=True)
    associated_item = db.relationship('Item', backref='icons', uselist=False)


@dataclass
class CommandItem(db.Model):
    """
    Defines a new CommandItem in the database.

    Defined variables :
        {id, items, table_id, user_id}
    """

    id: int
    users: list
    table_id: int
    item_id: int

    _tablename_ = 'command_item'
    _table_args__ = (db.UniqueConstraint(
        'table_id', 'item_id', name='uc_table_item')),

    id = db.Column(db.Integer, primary_key=True)
    users = db.relationship('UserCommand')
    table_id = db.Column(db.Integer, db.ForeignKey('table.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)


@dataclass
class UserCommand(db.Model):
    """
    Defines a new UserCommand in the database.

    Defined variables :
    {id, user_id, command_id, item, command, order_amount}
    """

    user: User
    order_amount: int

    _tablename_ = 'user_command'
    _table_args__ = (db.UniqueConstraint(
        'id', 'user_id', name='uc_id_user_id')),

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    command_id = db.Column(db.Integer, db.ForeignKey('command_item.id'))
    user = db.relationship("User", uselist=False)
    command = db.relationship("CommandItem", uselist=False)
    order_amount = db.Column(db.Float)


item_menus = db.Table('item_menus',
                      db.Column('item_id', db.Integer, db.ForeignKey(
                          'item.id'), primary_key=True),
                      db.Column('menu_id', db.Integer, db.ForeignKey(
                          'menu.id'), primary_key=True)
                      )


@dataclass
class Menu(db.Model):
    """
    Defines a new Menu in the database.

    Defined variables :
        {id, items, jap_place}
    """

    id: int
    items: list

    _tablename_ = 'menu'
    id = db.Column(db.Integer, primary_key=True)
    items = db.relationship('Item', secondary=item_menus, lazy='subquery',
                            backref=db.backref('menus', lazy=True))
    jap_place = db.relationship("JapPlace", uselist=False, backref='menu')


table_members = db.Table('table_members',
                         db.Column('table_id', db.Integer, db.ForeignKey(
                             'table.id'), primary_key=True),
                         db.Column('user_id', db.Integer, db.ForeignKey(
                             'user.id'), primary_key=True)
                         )


@dataclass
class Table(db.Model):
    """
    Defines a new Table in the database.

    Defined variables :
        {id, emperor, command_id, members, jap_event_id}
    """

    id: int
    emperor: int
    status: int
    members: list

    _tablename_ = 'table'
    id = db.Column(db.Integer, primary_key=True)
    emperor = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.Integer, nullable=False, default=0)
    commands = db.relationship(
        'CommandItem', backref='table', lazy=True)
    members = db.relationship('User', secondary=table_members, lazy='subquery',
                              backref=db.backref('table', lazy=True))
    jap_event_id = db.Column(db.Integer, db.ForeignKey(
        'jap_event.id'), nullable=False)

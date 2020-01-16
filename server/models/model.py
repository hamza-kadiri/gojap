"""Database Model."""

from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

user_achievements = db.Table('user_achievements',
                             db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                             db.Column('achievement_id', db.Integer, db.ForeignKey('achievement.id'), primary_key=True)
                             )

def format_attribute(obj, name):
    attr = getattr(obj, name)
    if isinstance(attr, datetime.datetime):
        return attr.__str__()
    else:
        return attr

class User(db.Model):
    """
    Defines a new user in the database.

    Defined variables :
        {id, pseudo, email, phone, calorie, command_user_ids, achievments}
    """

    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    pseudo = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=True)
    phone = db.Column(db.String(12), unique=False, nullable=True)
    calorie = db.Column(db.Integer, unique=False, nullable=True)
    avatar_url = db.Column(db.String(120), nullable=True)
    command_user_ids = db.relationship('CommandUser', backref='user', lazy=True)
    achievements = db.relationship('Achievement', secondary=user_achievements, lazy='subquery',
                                   backref=db.backref('user', lazy=True))

    def __repr__(self):
        """Representation method."""
        return '<User %r>' % self.pseudo

    def as_dict(self):
        """Return object as dict."""
        return {c.name: format_attribute(self, c.name) for c in self.__table__.columns}


jap_event_users = db.Table('jap_event_users',
                           db.Column('jap_event_id', db.Integer, db.ForeignKey('jap_event.id'), primary_key=True),
                           db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
                           )


class JapEvent(db.Model):
    """
    Defines a new JapEvent in the database.

    Defined variables :
        {id, userName, description, date, jap_place_id, photo_ids, event_ids,table_ids, users}
    """

    __tablename__ = 'jap_event'
    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(200), unique=False, nullable=True)
    date = db.Column(db.DateTime(), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(), unique=False, nullable=True)
    created_by = db.Column(db.DateTime(), db.ForeignKey('user.id'), nullable=True)
    jap_place_id = db.Column(db.Integer, db.ForeignKey('jap_place.id'),
                             nullable=False)
    photo_ids = db.relationship('Photo', backref='jap_event', lazy=True)
    event_ids = db.relationship('Event', backref='jap_event', lazy=True)
    table_ids = db.relationship('Table', backref='jap_event', lazy=True)
    users = db.relationship('User', secondary=jap_event_users, lazy='subquery',
                            backref=db.backref('jap_events', lazy=True))

    def __repr__(self):
        """Representation method."""
        return '<JapEvent %r>' % self.event_name

    def as_dict(self):
        """Return object as dict."""
        return {c.name: format_attribute(self, c.name) for c in self.__table__.columns}


event_users = db.Table('event_users',
                       db.Column('event_id', db.Integer, db.ForeignKey('event.id'), primary_key=True),
                       db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
                       )


class Achievement(db.Model):
    """
    Defines a new Achievment in the database.

    Defined variables :
        {id, name, image, condition}
    """

    __tablename__ = 'achievement'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=True)
    image = db.Column(db.String(120), unique=False, nullable=True)
    condition = db.Column(db.String(120), unique=False, nullable=True)

    def __repr__(self):
        """Representation method."""
        return '<Achievement %r>' % self.name

    def as_dict(self):
        """Return object as dict."""
        return {c.name: format_attribute(self, c.name) for c in self.__table__.columns}


class Event(db.Model):
    """
    Defines a new Event in the database.

    Defined variables :
        {id, description, jap_event_id, users}
    """

    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), unique=False, nullable=True)
    jap_event_id = db.Column(db.Integer, db.ForeignKey('jap_event.id'), nullable=False)
    users = db.relationship('User', secondary=event_users, lazy='subquery',
                            backref=db.backref('events', lazy=True))

    def __repr__(self):
        """Representation method."""
        return '<Event %r>' % self.id

    def as_dict(self):
        """Return object as dict."""
        return {c.name: format_attribute(self, c.name) for c in self.__table__.columns}


class JapPlace(db.Model):
    """
    Defines a new JapPlace in the database.

    Defined variables :
        {id, userName, addresse, telephone, horaires, jap_event_ids, menu_id}
    """

    __tablename__ = 'jap_place'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    adresse = db.Column(db.String(200), unique=False, nullable=False)
    telephone = db.Column(db.String(80), unique=False, nullable=True)
    horaires = db.Column(db.String(80), unique=False, nullable=True)
    jap_event_ids = db.relationship('JapEvent', backref='jap_place', lazy=True)
    menu_id = db.Column(db.Integer, db.ForeignKey('menu.id'), nullable=False)

    def __repr__(self):
        """Representation method."""
        return '<JapPlace %r>' % self.name

    def as_dict(self):
        """Return object as dict."""
        return {c.name: format_attribute(self, c.name) for c in self.__table__.columns}


class Photo(db.Model):
    """
    Defines a new Photo in the database.

    Defined variables :
        {id, jap_event_id}
    """

    __tablename__ = 'photos'
    id = db.Column(db.Integer, primary_key=True)
    jap_event_id = db.Column(db.Integer, db.ForeignKey('jap_event.id'), nullable=False)


class Icon(db.Model):
    """
    Defines a new Icon in the database.

    Defined variables :
        {id, item_associated}
    """

    _tablename_ = 'icon'
    id = db.Column(db.Integer, primary_key=True)
    thumbnail_url = db.Column(db.String(120), nullable=True)
    item_associated = db.relationship('Item', backref='icons', uselist=False)


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

    def as_dict(self):
        """Return object as dict."""
        return {c.name: format_attribute(self, c.name) for c in self.__table__.columns}


item_commands = db.Table('item_commands',
                         db.Column('item_id', db.Integer, db.ForeignKey('item.id'), primary_key=True),
                         db.Column('command_id', db.Integer, db.ForeignKey('command_user.id'), primary_key=True)
                         )


class CommandUser(db.Model):
    """
    Defines a new CommandUser in the database.

    Defined variables :
        {id, items, table_id, user_id}
    """

    _tablename_ = 'command_user'
    id = db.Column(db.Integer, primary_key=True)
    items = db.relationship('Item', secondary=item_commands, lazy='subquery',
                            backref=db.backref('command_users', lazy=True))
    table_id = db.Column(db.Integer, db.ForeignKey('table.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def as_dict(self):
        """Return object as dict."""
        return {c.name: format_attribute(self, c.name) for c in self.__table__.columns}


item_menus = db.Table('item_menus',
                      db.Column('item_id', db.Integer, db.ForeignKey('item.id'), primary_key=True),
                      db.Column('menu_id', db.Integer, db.ForeignKey('menu.id'), primary_key=True)
                      )


class Menu(db.Model):
    """
    Defines a new Menu in the database.

    Defined variables :
        {id, items, jap_place}
    """

    _tablename_ = 'menu'
    id = db.Column(db.Integer, primary_key=True)
    items = db.relationship('Item', secondary=item_menus, lazy='subquery',
                            backref=db.backref('menus', lazy=True))
    jap_place = db.relationship("JapPlace", uselist=False, backref='menu')

    def as_dict(self):
        """Return object as dict."""
        return {c.name: format_attribute(self, c.name) for c in self.__table__.columns}


table_users = db.Table('table_users',
                       db.Column('table_id', db.Integer, db.ForeignKey('table.id'), primary_key=True),
                       db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
                       )


class Table(db.Model):
    """
    Defines a new Table in the database.

    Defined variables :
        {id, emperor, command_user_id, users, jap_event_id}
    """

    _tablename_ = 'table'
    id = db.Column(db.Integer, primary_key=True)
    emperor = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.Boolean, nullable=True)
    command_user_id = db.relationship('CommandUser', backref='table', lazy=True)
    users = db.relationship('User', secondary=table_users, lazy='subquery',
                            backref=db.backref('table', lazy=True))
    jap_event_id = db.Column(db.Integer, db.ForeignKey('jap_event.id'), nullable=False)

    def as_dict(self):
        """Return object as dict."""
        return {c.name: format_attribute(self, c.name) for c in self.__table__.columns}

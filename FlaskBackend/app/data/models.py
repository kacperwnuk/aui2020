from datetime import datetime

from flask_security import UserMixin, RoleMixin

from .. import database as db

users_codes = db.Table('users_codes',
                       db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
                       db.Column('code_id', db.Integer(), db.ForeignKey('httpcode.id')))
users_events = db.Table('users_events',
                        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
                        db.Column('event_id', db.Integer(), db.ForeignKey('userevent.id')))


class HttpCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.Integer, unique=False)
    time = db.Column(db.DateTime, unique=False, default=datetime.now)


class UserEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    site = db.Column(db.String(20), unique=False)
    enter_time = db.Column(db.DateTime, unique=False)
    exit_time = db.Column(db.DateTime, unique=False)
    time_spent = db.Column(db.DateTime, unique=False)  # czy moze jako integer w sek??


roles_users = db.Table('roles_users',
                       db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
                       db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))
    http_codes = db.relationship('HttpCode', secondary=users_codes,
                                 backref=db.backref('users', lazy='dynamic'))
    events = db.relationship('UserEvent', secondary=users_events,
                             backref=db.backref('users', lazy='dynamic'))


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

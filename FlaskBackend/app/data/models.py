from datetime import datetime

from flask_security import UserMixin, RoleMixin

from .. import database as db


class HttpCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.Integer, unique=False)
    time = db.Column(db.DateTime, unique=False, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class UserEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    site = db.Column(db.String(20), unique=False)
    enter_time = db.Column(db.DateTime, unique=False, default=datetime.now)
    exit_time = db.Column(db.DateTime, unique=False)
    time_spent = db.Column(db.Integer, unique=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


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
    http_codes = db.relationship('HttpCode', backref='users_http_code')
    events = db.relationship('UserEvent', backref='users_event')


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

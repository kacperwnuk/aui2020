from datetime import datetime
from .. import database as db


class Action(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=False, nullable=True)
    time = db.Column(db.DateTime, unique=False, default=datetime.now)



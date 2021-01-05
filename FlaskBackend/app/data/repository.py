from datetime import datetime
from .. import database as db
from .models import HttpCode, UserEvent


def create_db():
    db.create_all()


def create_code(code):
    http_code = HttpCode(code=code)
    db.session.add(http_code)
    db.session.commit()


def create_event(site, enter_time, exit_time):
    event = UserEvent(site=site, enter_time=enter_time,
                      exit_time=exit_time, time_spent=datetime.now)
    db.session.add(event)
    db.session.commit()

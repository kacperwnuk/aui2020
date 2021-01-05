from datetime import datetime
from .. import database as db
from .models import HttpCode, UserEvent


def create_db():
    db.create_all()


def create_code(code, user_id):
    http_code = HttpCode(code=code, user_id=user_id)
    db.session.add(http_code)
    db.session.commit()


def start_event(site, user_id):
    event = UserEvent(site=site, enter_time=datetime.now(), user_id=user_id)
    db.session.add(event)
    db.session.commit()
    return event.id


def finish_event(event_id):
    event = db.session.query(UserEvent).filter(UserEvent.id == event_id).first()
    event.exit_time = datetime.now()
    event.time_spent = (event.exit_time - event.enter_time).seconds
    db.session.commit()

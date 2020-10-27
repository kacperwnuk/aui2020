from .. import database as db
from .models import Action


def create_db():
    db.create_all()


def create_action(action_name):
    user = Action(name=action_name)
    db.session.add(user)
    db.session.commit()

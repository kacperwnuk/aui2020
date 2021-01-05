from datetime import datetime

from flask import request, current_app
from flask_cors import cross_origin
from flask_login import current_user, logout_user
from flask_security.utils import hash_password
import json

from . import app, api, database
from .data import repository
from flask_restful import Resource
from flask_security import Security, SQLAlchemyUserDatastore, login_required

from .data.models import User, Role


@app.route('/initialize')
@cross_origin()
def initialize_db():
    repository.create_db()
    user_datastore.create_user(email="kacper@o2.pl", password=hash_password("test"))
    database.session.commit()
    return "done"


@app.route('/')
@cross_origin()
def hello():
    repository.create_code(500)
    return 'Hello World!.\n'.format(1), 200


user_datastore = SQLAlchemyUserDatastore(database, User, Role)
security = Security(app, user_datastore)


# @app.before_first_request
# def create_user():
#     database.create_all()
#     user_datastore.create_user(email="kacper@o2.pl", password=hash_password("test"))
#     database.session.commit()


@app.route("/disconnect")
@cross_origin()
def logout():
    logout_user()
    return "Disconnected"


class Registration(Resource):
    @cross_origin()
    def post(self):
        body = request.json
        email = body.get("email")
        password = body.get("password")
        if email is None or password is None:
            return "Missing email or password", 400
        user = User.query.filter(User.email == email).first()
        if user is not None:
            return f"Email already used", 400
        user_datastore.create_user(email=email, password=hash_password(password))
        database.session.commit()
        return {f"Success": body}


class HelloWorld(Resource):

    @cross_origin()
    def get(self):
        if not current_user.is_authenticated:
            repository.create_code(401)
            return "Unauthorized user", 401
        return {"msg": '{}\n'.format(current_user.id)}


api.add_resource(Registration, '/register')
api.add_resource(HelloWorld, '/hello')


@app.route('/create_code', methods=['POST'])
def create_code():
    if not current_user.is_authenticated:
        repository.create_code(401)
        return "Unauthorized user", 401
    data = request.json
    repository.create_code(data["code"], current_user.id)
    return "Success", 200


@app.route('/start_event', methods=['POST'])
def start_event():
    if not current_user.is_authenticated:
        repository.create_code(401)
        return "Unauthorized user", 401
    data = request.json
    event_id = repository.start_event(data["site"], current_user.id)
    return {"event_id": event_id}, 200


@app.route('/finish_event', methods=['POST'])
def finish_event():
    if not current_user.is_authenticated:
        repository.create_code(401)
        return "Unauthorized user", 401
    data = request.json
    repository.finish_event(data["event_id"])
    return "Success", 200

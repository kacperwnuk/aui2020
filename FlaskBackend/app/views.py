from flask import request, abort
from flask_cors import cross_origin
from flask_login import current_user, logout_user
from flask_security.utils import hash_password

from werkzeug.exceptions import InternalServerError

from . import app, api, database
from .data import repository
from flask_restful import Resource
from flask_security import Security, SQLAlchemyUserDatastore

from .data.models import User, Role


@app.errorhandler(InternalServerError)
def server_error(e):
    app.logger.warning(e)
    if current_user.is_authenticated:
        repository.create_code(500, current_user.id)
    else:
        repository.create_code(500, 1)
    return "Internal server error", 500


@app.errorhandler(404)
def not_found(e):
    repository.create_code(404, 1)
    return "Not found", 404


@app.errorhandler(401)
def default(e):
    repository.create_code(401, 1)
    return str(e), 401


@app.errorhandler(400)
def bad_request(e):
    repository.create_code(400, 1)
    return str(e), 400


@app.route('/initialize')
@cross_origin()
def initialize_db():
    repository.create_db()
    user_datastore.create_user(email="test@o2.pl", password=hash_password("test"))
    database.session.commit()
    return "done"


@app.route('/')
@cross_origin()
def start():
    repository.create_code(500)
    return 'Start with explosion!.\n'.format(1), 200


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
    repository.create_code(200, current_user.id)
    logout_user()
    return "Disconnected"


@app.route('/register', methods=['POST'])
@cross_origin()
def post():
    body = request.json
    email = body.get("email")
    password = body.get("password")
    if email is None or password is None:
        abort(400, "Missing email or passwd")
    user = User.query.filter(User.email == email).first()
    if user is not None:
        abort(400, "Email already used")
    user_datastore.create_user(email=email, password=hash_password(password))
    database.session.commit()
    repository.create_code(200, 1)
    return {f"Success": body}


@app.route('/hello', methods=['GET'])
@cross_origin()
def hello():
    if not current_user.is_authenticated:
        abort(401, "Unauthorized user")
    repository.create_code(200, current_user.id)
    return {"msg": '{}\n'.format(current_user.id)}


@app.route('/create_code', methods=['POST'])
@cross_origin()
def create_code():
    if not current_user.is_authenticated:
        abort(401, "Unauthorized user")
    data = request.json
    repository.create_code(data["code"], current_user.id)
    repository.create_code(200, current_user.id)
    return "Success", 200


@app.route('/start_event', methods=['POST'])
@cross_origin()
def start_event():
    if not current_user.is_authenticated:
        abort(401, "Unauthorized user")
    data = request.json
    event_id = repository.start_event(data["site"], current_user.id)
    repository.create_code(200, current_user.id)
    return {"event_id": event_id}, 200


@app.route('/finish_event', methods=['POST'])
@cross_origin()
def finish_event():
    if not current_user.is_authenticated:
        abort(401, "Unauthorized user")
    data = request.json
    repository.finish_event(data["event_id"])
    repository.create_code(200, current_user.id)
    return "Success", 200

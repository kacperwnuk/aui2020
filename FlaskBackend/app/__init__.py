from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user="postgres", pw="postgres", url="db:5432",
                                                               db="postgres")

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'the random string'
app.config['SECURITY_PASSWORD_SALT'] = 'fdasfdas'
app.config['WTF_CSRF_ENABLED'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

database = SQLAlchemy(app)
api = Api(app)

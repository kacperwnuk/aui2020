from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user="postgres", pw="postgres", url="db:5432",
                                                               db="postgres")

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

database = SQLAlchemy(app)

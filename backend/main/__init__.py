from flask import Flask, render_template, flash, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.sql import func
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'megasubbot010101'


user = 'root'
passw = 'test'
host =  'localhost'
port = 3306
database = 'megasubbot'

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://{user}:{pw}@{host}/{db}".format(host=host, db=database, user=user, pw=passw)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#print("mysql://{user}:{pw}@{host}/{db}".format(host=host, db=database, user=user, pw=passw))

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)

from main import routes



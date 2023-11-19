from main import db
from main import bcrypt
from sqlalchemy.sql import func
import main.models as md
import datetime
from flask import render_template, redirect, url_for, flash, request, jsonify, abort
from main import app
from functools import wraps
import jwt
#import jwt

#our model
class UserAccount(db.Model):
    id = db.Column(db.Integer(), primary_key = True)
    email = db.Column(db.String(100), nullable=False , unique = True)
    password = db.Column(db.String(100), nullable=False)
    status = db.Column(db.Boolean(), nullable=False)
    created_at =db.Column(db.DateTime(timezone=True),server_default=func.now())

    def set_password(self, plain_text_password):
        return bcrypt.generate_password_hash(plain_text_password).decode('utf-8')

    def __init__(self, email, password, status):
        self.email = email
        self.password = self.set_password(password)
        self.status = status

    def check_password_hash(self, attempted_password):
        return bcrypt.check_password_hash(self.password, attempted_password)

    def login(self, password):
        if not self.check_password_hash(password):
            return None
        return self
    
    def change_password(self, email, password, status):
        self.password = self.set_password(password)
        return self
    

        

class Strategy(db.Model):
    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user_account.id'))
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.Boolean(), nullable=False)
    created_at =db.Column(db.DateTime(timezone=True),server_default=func.now())
    deleted_at =db.Column(db.DateTime(timezone=True))

    def __init__(self, user_id, name, description, status):
        self.user_id = user_id
        self.name = name
        self.description = description
        self.status = status
    
    def delete_strategy(self):
        self.status = False
        self.deleted_at = datetime.datetime.now()
        return self
    
    def __repr__(self):
        return { "id" : self.id , 
                "user_id" : self.user_id , 
                "name" : self.name,
                "description" : self.description,
                "status" : self.status }


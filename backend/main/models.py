from main import db
from main import bcrypt
from sqlalchemy.sql import func
import main.models as md
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

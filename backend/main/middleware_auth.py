from main import app
from flask import render_template, redirect, url_for, flash, request, jsonify, abort
from main.models import UserAccount, Strategy
from main import db
from functools import wraps
import jwt
from flask import request, abort



def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"]
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            data=jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = UserAccount.query.filter_by(email=data['email']).first()
            if current_user is None:
                return {
                "message": "Invalid Authentication token!",
                "data": None,
                "error": "Unauthorized"
            }, 401
            if not current_user.status:
                abort(403)
        except Exception as e:
            return {
                "message": "Something went wrong decoration",
                "data": None,
                "error": str(e)
            }, 500

        return f(current_user, *args, **kwargs)

    return decorated
from main import app
from flask import render_template, redirect, url_for, flash, request
from main.models import UserAccount
from main import db
from main.validate import validate_book, validate_email_and_password, validate_user, validate_email
import jwt

#creating our routes
@app.route('/')
@app.route('/home')
def landing_page():
    return ""


#login route
@app.route('/login' , methods = ['GET', 'POST'])
def login_page():
    try:
        data = request.json
        if not data:
            return {
                "message": "Please provide user details",
                "data": None,
                "error": "Bad request"
            }, 400
        # validate input
        is_validated = validate_email(data.get('email'))
        if is_validated is not True:
            return dict(message='Invalid data', data=None, error=is_validated), 400
        user = UserAccount.query.filter_by(email=data.get('email')).first()
        
        if user:
            data.get('password')
            user = user.login(password = data.get('password'))
        else:
            user = None
            
        
        if user:
            try:
                # token should expire after 24 hrs
                #user["token"]
                
                user_token = jwt.encode(
                    {
                        "email": user.email,
                        "password": user.password
                    },
                    app.config["SECRET_KEY"],
                    algorithm="HS256"
                )
                return {
                    "message": "Successfully fetched auth token",
                    "data": { "email" : user.email , "xtoken" : user_token , "password" : "dsdsdfdfsdsewer"}
                }
            except Exception as e:
                return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, 500
        return {
            "message": "Error fetching auth token!, invalid email or password",
            "data": None,
            "error": "Unauthorized"
        }, 404
    except Exception as e:
        return {
                "message": "Something went wrong!xxx",
                "error": str(e),
                "data": None
        }, 500

@app.route('/register', methods=['GET', 'POST'])
def register_page():
    try:
        data = request.json
        if not data:
            return {
                "message": "Please provide user details",
                "data": None,
                "error": "Bad request"
            }, 400
        # validate input
        is_validated = validate_email(data.get('email')) 
    
        if is_validated is not True:
            return dict(message='Invalid E-mail', data=None, error=is_validated), 400
        if len(data.get('password')) < 6:
            return dict(message='Password should be more than 6 letters', data=None, error=is_validated), 400
        
        user = UserAccount.query.filter_by(email=data.get('email')).first()
        
        if user:
            return dict(message='This e-mail address already be a member. Please use login instead.', data=None, error=is_validated), 400

        try:
            new_user = UserAccount(email = data.get('email') , password = data.get("password") , status = True)
            db.session.add(new_user)
            db.session.commit()
            return {
                    "message": "Your account have been successfully created. Please login",
                    "error" : ""
                }
            
        except Exception as e:
                return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, 500
        
    except Exception as e:
        return {
                "message": "Something went wrong!xxx",
                "error": str(e),
                "data": None
        }, 500


#@app.route('/home')
#def home_page():
#    #request.headers.get('Authorization')
#    logout_user()
#    flash("You have been logged out!", category='info')
#    return redirect(url_for("home_page"))


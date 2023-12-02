from main import app
from flask import render_template, redirect, url_for, flash, request, jsonify
from main.models import UserAccount, Strategy
from main import db
from main.validate import validate_book, validate_email_and_password, validate_user, validate_email, validate_new_strategy
import jwt
from main.middleware_auth import token_required
import datetime

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
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
        }, 500

@app.route('/strategy', methods=['GET', 'POST', 'PUT'])
@token_required
def strategy_page(current_user):
    try:
        user = current_user
        if request.method == 'GET':
            strategys = Strategy.query.filter_by(user_id=user.id,status = True)
            return_strategys = []
            for strategy in strategys:
                #print(str(strategy))
                return_strategys.append({ "id" : strategy.id , 
                "user_id" : strategy.user_id , 
                "name" : strategy.name,
                "description" : strategy.description,
                "status" : strategy.status })
            return jsonify(return_strategys)
        elif request.method in ['POST','PUT']:
            data = request.json
            is_validate = validate_new_strategy(data)
            if is_validate['is_valid'] is not True:
                return dict(error=is_validate['error_msg']), 400
            else:
                try:
                    if request.method == 'POST':
                        new_strategy = Strategy(user_id = user.id, name = data.get('name'), description = data.get('description'), status = True)
                        db.session.add(new_strategy)
                        db.session.commit()
                        return {
                            "message": "Strategy have been successfully created",
                            "error" : "",
                            "strategy_id" : new_strategy.id
                        }
                    elif request.method == 'PUT':
                        getstrategy = Strategy.query.filter_by(id=data.get('id')).first()
                        getstrategy.name = data.get('name')
                        getstrategy.description = data.get('description')
                        db.session.commit()
                        return {
                            "message": "Strategy have been successfully updated",
                            "error" : ""
                        }

                except Exception as e:
                    return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, 500            
        elif request.method == 'DELETE':
            data = request.json
            try:
                getstrategy = Strategy.query.filter_by(id=data.get('id')).first()
                getstrategy.status = False
                getstrategy.deleted_at = datetime.datetime.now()
                db.session.commit()
                return {
                        "message": "Strategy have been successfully deleted",
                        "error" : ""
                    }
            except Exception as e:
                    return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, 500
    except Exception as e:
        raise
        return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
        }, 500
    
@app.route('/strategy/<int:strategy_id>/',methods=['GET','DELETE'])
@token_required
def strategy_form_page(current_user,strategy_id):
    try:
        user = current_user
        strategy = Strategy.query.filter_by(user_id=user.id,id = strategy_id,status = True).first()
        
        if strategy:
            if request.method == 'GET':
                return jsonify({ "id" : strategy.id , 
                    "user_id" : strategy.user_id , 
                    "name" : strategy.name,
                    "description" : strategy.description,
                    "status" : strategy.status })
            elif request.method == 'DELETE':
                strategy.status = False
                strategy.deleted_at = datetime.datetime.now()
                db.session.commit()
                return {
                        "message": "Strategy have been successfully updated",
                        "error" : ""
                }

        else:
            return dict(message="Couldn't found", data=None, error=True), 400
        

    except Exception as e:
        raise
        return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
        }, 500
    
#@app.route('/home')
#def home_page():
#    #request.headers.get('Authorization')
#    logout_user()
#    flash("You have been logged out!", category='info')
#    return redirect(url_for("home_page"))

@app.errorhandler(403)
def forbidden(e):
    return jsonify({
        "message": "Forbidden",
        "error": str(e),
        "data": None
    }), 403

@app.errorhandler(404)
def forbidden(e):
    return jsonify({
        "message": "Endpoint Not Found",
        "error": str(e),
        "data": None
    }), 404



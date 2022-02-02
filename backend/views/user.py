from flask_jwt_extended import create_access_token
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_restful import Resource
from models.user import User 
from flask import request
from models.model import db 
from datetime import timedelta

class SignIn(Resource): 
    def post(self): 
        user = User.query.filter_by(email = request.json["email"]).first()
        if check_password_hash(user.password, request.json["password"]):
            access_token = create_access_token(
                identity=str(user.id),
                expires_delta=timedelta(hours=2)
            )
            return {"access_token": access_token}, 200
        else:
            return "Wrong email or password", 401
    

class SignUp(Resource):
    def post(self): 
        new_user = User(
            email = request.json["email"],
            password = generate_password_hash(request.json["password"])
        )
        db.session.add(new_user)
        db.session.commit()
        return "", 204
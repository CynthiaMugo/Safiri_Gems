from flask import Blueprint, request, jsonify
from app.db import db
from app.models.admin import Admin
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.post("/login")
def login():

    data = request.get_json()

    admin = Admin.query.filter_by(
        email=data["email"]
    ).first()

    if not admin:
        return jsonify({
            "message": "Invalid credentials"
        }), 401

    if not admin.check_password(data["password"]):
        return jsonify({
            "message": "Invalid credentials"
        }), 401

    token = create_access_token(
        identity=str(admin.id)
    )

    return jsonify({
        "token": token
    })
from flask import Blueprint, request, jsonify
from app.db import db
from app.models.category import Category

category_bp = Blueprint("category_bp", __name__)

@category_bp.get("/")
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200


@category_bp.post("/")
def create_category():
    data = request.get_json()

    category = Category(name=data.get("name"))

    db.session.add(category)
    db.session.commit()

    return jsonify(category.to_dict()), 201
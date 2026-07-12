from flask import Blueprint, request, jsonify
from app.db import db
from app.models.category import Category
from flask_jwt_extended import jwt_required

category_bp = Blueprint("category_bp", __name__)

@category_bp.get("/")
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200


@category_bp.post("/")
@jwt_required()
def create_category():
    data = request.get_json()

    category = Category(
        name=data.get("name"),
        description=data.get("description")
    )

    db.session.add(category)
    db.session.commit()

    return jsonify(category.to_dict()), 201

@category_bp.put("/<int:category_id>")
@jwt_required()
def update_category(category_id):

    category = Category.query.get_or_404(category_id)

    data = request.get_json()

    category.name = data.get("name", category.name)
    category.description = data.get(
        "description",
        category.description
    )

    db.session.commit()

    return jsonify(category.to_dict()), 200

@category_bp.delete("/<int:category_id>")
@jwt_required()
def delete_category(category_id):

    category = Category.query.get_or_404(category_id)

    db.session.delete(category)
    db.session.commit()

    return jsonify({
        "message":"Category deleted"
    }),200
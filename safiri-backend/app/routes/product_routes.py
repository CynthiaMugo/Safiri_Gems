from flask import Blueprint, request, jsonify
from app.db import db
from app.models.product import Product
from flask_jwt_extended import jwt_required

product_bp = Blueprint("product_bp", __name__)

@product_bp.get("")
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200


@product_bp.get("/<int:product_id>")
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200


@product_bp.post("")
@jwt_required()
def create_product():
    data = request.get_json()

    product = Product(
        name=data.get("name"),
        description=data.get("description"),
        price=data.get("price"),
        image_url=data.get("image_url"),
        stock=data.get("stock", 0),
        is_featured=data.get("is_featured", False),
        category_id=data.get("category_id")
    )

    db.session.add(product)
    db.session.commit()

    return jsonify({
        "message": "Product Created",
        "product": product.to_dict()
    }), 201


@product_bp.put("/<int:product_id>")
@jwt_required()
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()

    product.name = data.get("name", product.name)
    product.description = data.get("description", product.description)
    product.price = data.get("price", product.price)
    product.image_url = data.get("image_url", product.image_url)
    product.stock = data.get("stock", product.stock)
    product.is_featured = data.get("is_featured", product.is_featured)
    product.category_id = data.get("category_id", product.category_id)

    db.session.commit()

    return jsonify(product.to_dict()), 200


@product_bp.delete("/<int:product_id>")
@jwt_required()
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"}), 200
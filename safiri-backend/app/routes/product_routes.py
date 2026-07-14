from flask import Blueprint, request, jsonify
from app.db import db
from app.models.product import Product
from flask_jwt_extended import jwt_required
from app.utils.cloudinary import upload_image

product_bp = Blueprint("product_bp", __name__)

@product_bp.get("/")
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200


@product_bp.get("/<int:product_id>")
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200


@product_bp.post("/")
@jwt_required()
def create_product():
    form = request.form
    image = request.files.get("image")
    image_url = None
    print(form)
    print(request.files)

    if image:
        image_url = upload_image(image)

    product = Product(
        name=form.get("name"),
        description=form.get("description"),
        price=float(form.get("price")),
        stock=int(form.get("stock")),
        category_id=int(form.get("category_id")),
        is_featured=form.get("is_featured") == "true",
        image_url=image_url,
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
    form = request.form
    image = request.files.get("image")
    if image:
        product.image_url = upload_image(image)

    if form.get("price"):
        product.price = float(form.get("price"))

    if form.get("stock"):
        product.stock = int(form.get("stock"))

    if form.get("category_id"):
        product.category_id = int(form.get("category_id"))

    product.name = form.get("name", product.name)
    product.description = form.get("description", product.description)
    product.is_featured = form.get("is_featured") == "true"
    db.session.commit()

    return jsonify(product.to_dict()), 200


@product_bp.delete("/<int:product_id>")
@jwt_required()
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"}), 200
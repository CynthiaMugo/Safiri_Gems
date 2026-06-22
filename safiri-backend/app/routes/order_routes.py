from flask import Blueprint, request, jsonify
from app.db import db
from app.models.order import Order
from app.models.product import Product
from flask_jwt_extended import jwt_required

order_bp = Blueprint("order_bp", __name__)

@order_bp.get("/")
@jwt_required()
def get_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders]), 200


@order_bp.post("/")
def create_order():
    data = request.get_json()

    product = Product.query.get_or_404(data.get("product_id"))

    quantity = int(data.get("quantity", 1))
    total_price = product.price * quantity

    order = Order(
        customer_name=data.get("customer_name"),
        customer_phone=data.get("customer_phone"),
        customer_email=data.get("customer_email"),
        product_id=product.id,
        # product_name=product.name,
        # product_price=product.price,
        quantity=quantity,
        total_price=total_price,
        mpesa_reference=data.get("mpesa_reference"),
        delivery_location=data.get("delivery_location")
    )

    db.session.add(order)
    db.session.commit()

    return jsonify(order.to_dict()), 201


@order_bp.put("/<int:order_id>/status")
@jwt_required()
def update_order_status(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()

    order.payment_status = data.get("payment_status", order.payment_status)
    order.order_status = data.get("order_status", order.order_status)

    db.session.commit()

    return jsonify(order.to_dict()), 200
from flask import Blueprint, request, jsonify
from app.db import db
from app.models.order import Order
from app.models.order_item import OrderItem
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

    items = data.get("items", [])

    if not items:
        return jsonify({
            "message": "Order must contain at least one item."
        }), 400

    # Validate products first
    validated_items = []

    for item in items:
        product = Product.query.get(item.get("product_id"))

        if not product:
            return jsonify({
                "message": f"Product {item.get('product_id')} not found."
            }), 404

        quantity = int(item.get("quantity", 1))

        if quantity < 1:
            return jsonify({
                "message": f"Invalid quantity for {product.name}."
            }), 400

        validated_items.append((product, quantity))

    # Create order
    order = Order(
        customer_name=data.get("customer_name"),
        customer_phone=data.get("customer_phone"),
        customer_email=data.get("customer_email"),
        delivery_location=data.get("delivery_location"),
        mpesa_reference=data.get("mpesa_reference"),
    )

    db.session.add(order)

    # Flush to generate database ID
    db.session.flush()

    # Generate order number
    order.order_number = f"SG-{order.id:05d}"

    # Create order items
    for product, quantity in validated_items:

        order_item = OrderItem(
            order=order,
            product=product,
            quantity=quantity,
            unit_price=product.price,
        )

        db.session.add(order_item)

    # Commit once
    db.session.commit()

    return jsonify(order.to_dict()), 201


@order_bp.put("/<int:order_id>/status")
@jwt_required()
def update_order_status(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()

    order.payment_status = data.get(
        "payment_status",
        order.payment_status
    )

    order.order_status = data.get(
        "order_status",
        order.order_status
    )

    db.session.commit()

    return jsonify(order.to_dict()), 200
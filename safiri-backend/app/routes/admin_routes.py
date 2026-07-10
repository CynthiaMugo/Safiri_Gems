from flask import Blueprint, request, jsonify
from app.db import db
from app.models.admin import Admin
from flask_jwt_extended import create_access_token, jwt_required
from app.models.product import Product
from app.models.order import Order
from app.models.contact_message import ContactMessage

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

@auth_bp.get("/dashboard")
@jwt_required()
def dashboard():

    recent_orders = (
        Order.query
        .order_by(Order.created_at.desc())
        .limit(5)
        .all()
    )

    return jsonify({
        "products": Product.query.count(),

        "orders": Order.query.count(),

        "pending_orders": Order.query.filter_by(
            order_status="new"
        ).count(),

        "messages": 0,

        "recent_orders": [
            {
                "id": order.id,
                "order_number": order.order_number,
                "customer_name": order.customer_name,
                "total_price": sum(
                    item.unit_price * item.quantity
                    for item in order.items
                ),
                "status": order.order_status,
                "created_at": order.created_at.isoformat()
            }
            for order in recent_orders
        ]
    }), 200

# data = request.get_json()

#     email = data.get("email")
#     password = data.get("password")

#     admin = Admin.query.filter_by(
#         email=email
#     ).first()

#     if not admin:
#         return jsonify({
#             "message": "Invalid credentials"
#         }), 401

#     if not admin.check_password(password):
#         return jsonify({
#             "message": "Invalid credentials"
#         }), 401

#     token = create_access_token(
#         identity=str(admin.id)
#     )

#     return jsonify({
#         "token": token
#     }), 200
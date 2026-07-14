from flask import Blueprint, request, jsonify
from app.db import db
from app.models.contact_message import ContactMessage
from flask_jwt_extended import jwt_required

message_bp = Blueprint("messages", __name__)


# Customer sends message
@message_bp.route("/", methods=["POST"])
def create_message():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    name = data.get("name")
    phone = data.get("phone")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({
            "message": "Name, email and message are required"
        }), 400

    new_message = ContactMessage(
        name=name,
        phone=phone,
        email=email,
        message=message
    )

    db.session.add(new_message)
    db.session.commit()

    return jsonify({
        "message": "Message sent successfully"
    }), 201


# Admin fetch messages later
@message_bp.route("/", methods=["GET"])
@jwt_required()
def get_messages():
    messages = ContactMessage.query.order_by(
        ContactMessage.created_at.desc()
    ).all()

    return jsonify([
        {
            "id": msg.id,
            "name": msg.name,
            "phone": msg.phone,
            "email": msg.email,
            "message": msg.message,
            "created_at": msg.created_at,
            "is_read": msg.is_read
        }
        for msg in messages
    ])

@message_bp.route("/<int:id>/read", methods=["PUT"])
@jwt_required()
def mark_as_read(id):

    message = ContactMessage.query.get_or_404(id)

    message.is_read = True

    db.session.commit()

    return jsonify({
        "message": "Message marked as read"
    })

@message_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_message(id):

    message = ContactMessage.query.get_or_404(id)

    db.session.delete(message)

    db.session.commit()

    return jsonify({
        "message": "Message deleted"
    })
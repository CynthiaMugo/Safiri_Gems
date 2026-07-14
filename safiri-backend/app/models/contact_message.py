from app.db import db

class ContactMessage(db.Model):
    __tablename__ = "contact_messages"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(120),
        nullable=False
    )
    phone = db.Column(
        db.String(20),
        nullable=True
    )

    email = db.Column(
        db.String(120),
        nullable=False
    )

    message = db.Column(
        db.Text,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    is_read = db.Column(
        db.Boolean,
        default=False
    )
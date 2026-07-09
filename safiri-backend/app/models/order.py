from app.db import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)

    customer_name = db.Column(db.String(150), nullable=False)
    customer_phone = db.Column(db.String(50), nullable=False)
    customer_email = db.Column(db.String(150))

    payment_method = db.Column(
        db.String(50),
        default="mpesa_till"
    )

    payment_status = db.Column(
        db.String(50),
        default="pending"
    )

    mpesa_reference = db.Column(db.String(100))

    delivery_location = db.Column(db.String(255))

    order_status = db.Column(
        db.String(50),
        default="new"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    items = db.relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "customer_name": self.customer_name,
            "customer_phone": self.customer_phone,
            "customer_email": self.customer_email,
            "payment_method": self.payment_method,
            "payment_status": self.payment_status,
            "mpesa_reference": self.mpesa_reference,
            "delivery_location": self.delivery_location,
            "order_status": self.order_status,
            "created_at": self.created_at.isoformat(),
            "items": [
                item.to_dict()
                for item in self.items
            ]
        }
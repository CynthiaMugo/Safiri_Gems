from app.db import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    PAYMENT_PENDING = "pending"
    PAYMENT_PAID = "paid"

    STATUS_NEW = "new"
    STATUS_PROCESSING = "processing"
    STATUS_READY = "ready"
    STATUS_DELIVERED = "delivered"
    STATUS_CANCELLED = "cancelled"

    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(
        db.String(20),
        unique=True,
        nullable=True
    )

    customer_name = db.Column(db.String(150), nullable=False)
    customer_phone = db.Column(db.String(50), nullable=False)
    customer_email = db.Column(db.String(150))

    payment_method = db.Column(
        db.String(50),
        default="mpesa_till"
    )

    payment_status = db.Column(
        db.String(50),
        default=PAYMENT_PENDING
    )

    mpesa_reference = db.Column(db.String(100))

    delivery_location = db.Column(db.String(255))

    order_status = db.Column(
        db.String(50),
        default=STATUS_NEW
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
            "order_number": self.order_number,
            "customer_name": self.customer_name,
            "customer_phone": self.customer_phone,
            "customer_email": self.customer_email,
            "payment_method": self.payment_method,
            "payment_status": self.payment_status,
            "mpesa_reference": self.mpesa_reference,
            "delivery_location": self.delivery_location,
            "order_status": self.order_status,
            "total_price": sum(
                item.unit_price * item.quantity
                for item in self.items
            ),
            "created_at": self.created_at.isoformat(),
            "items": [
                item.to_dict()
                for item in self.items
            ]
            
        }
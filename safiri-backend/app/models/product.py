from app.db import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    stock = db.Column(db.Integer, default=0)
    is_featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(
    db.DateTime,
    server_default=db.func.now()
    )

    updated_at = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        onupdate=db.func.now()
    )

    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url,
            "stock": self.stock,
            "is_featured": self.is_featured,
            "category": self.category.name if self.category else None,
            "category_id": self.category_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at

        }
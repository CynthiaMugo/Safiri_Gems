from app.db import db

class ProductImage(db.Model):
    __tablename__ = "product_images"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    image_url = db.Column(
        db.String(500),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id")
    )

    product = db.relationship(
        "Product",
        back_populates="images"
    )
from app import create_app
from app.db import db

from app.models.admin import Admin
from app.models.category import Category
from app.models.product import Product

app = create_app()

with app.app_context():

    print("Clearing existing data...")

    Product.query.delete()
    Category.query.delete()
    Admin.query.delete()

    db.session.commit()

    print("Creating admin...")

    admin = Admin(
        username="admin",
        email="admin@safirigems.com"
    )

    admin.set_password("admin123")

    db.session.add(admin)

    print("Creating categories...")

    necklaces = Category(name="Necklaces")
    earrings = Category(name="Earrings")
    bracelets = Category(name="Bracelets")

    db.session.add_all([
        necklaces,
        earrings,
        bracelets
    ])

    db.session.commit()

    print("Creating products...")

    products = [

        Product(
            name="Golden Bloom Necklace",
            description="Elegant gold necklace for special occasions.",
            price=2500,
            stock=10,
            image_url="/images/necklace1.jpg",
            category_id=necklaces.id,
            is_featured=True
        ),

        Product(
            name="Crystal Drop Earrings",
            description="Sparkling crystal earrings.",
            price=1800,
            stock=15,
            image_url="/images/earrings1.jpg",
            category_id=earrings.id
        ),

        Product(
            name="Rose Gold Bracelet",
            description="Minimalist bracelet with rose gold finish.",
            price=2200,
            stock=8,
            image_url="/images/bracelet1.jpg",
            category_id=bracelets.id
        )

    ]

    db.session.add_all(products)

    db.session.commit()

    print("Database seeded successfully!")
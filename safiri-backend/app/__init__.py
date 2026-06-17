from flask import Flask
from .config import Config
from .db import db,migrate
from .models import *
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app=Flask(__name__)
    app.config.from_object(Config)

    # initialize db
    db.init_app(app)
    migrate.init_app(app,db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # register blueprint
    # app.register_blueprint(student_bp)
    # app.register_blueprint(student_bp,url_prefix="/student")
    # from .routes.product_routes import product_bp
    # from .routes.category_routes import category_bp
    # from .routes.order_routes import order_bp

    # app.register_blueprint(product_bp, url_prefix="/api/products")
    # app.register_blueprint(category_bp, url_prefix="/api/categories")
    # app.register_blueprint(order_bp, url_prefix="/api/orders")
    

    return app
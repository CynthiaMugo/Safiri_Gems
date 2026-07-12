from flask import Flask
from .config import Config
from .db import db, migrate, jwt
from .models import *
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS


bcrypt = Bcrypt()

def create_app():
    app=Flask(__name__)
    app.config.from_object(Config)

    # initialize db
    db.init_app(app)
    migrate.init_app(app,db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # enable CORS for all routes
    CORS(app, resources={r"/*": {"origins": "*"}})

    # register blueprint
    # app.register_blueprint(student_bp)
    # app.register_blueprint(student_bp,url_prefix="/student")
    from .routes.product_routes import product_bp
    from .routes.category_routes import category_bp
    from .routes.order_routes import order_bp
    from .routes.admin_routes import auth_bp
    from .routes.message_routes import message_bp

    app.register_blueprint(product_bp, url_prefix="/products")
    app.register_blueprint(category_bp, url_prefix="/categories")
    app.register_blueprint(order_bp, url_prefix="/orders")
    app.register_blueprint(auth_bp, url_prefix="/admin")
    app.register_blueprint(message_bp, url_prefix="/messages")
    

    return app
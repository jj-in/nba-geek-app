from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

db = SQLAlchemy()
bcrypt = Bcrypt()

def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')

    db.init_app(app)
    bcrypt.init_app(app)
    jwt = JWTManager(app)
    CORS(app, resources={r"/api/*": {
        "origins": "*",
        "allow_headers": [
            "Content-Type", 
            "Authorization", 
            "X-Requested-With"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }})


    with app.app_context():
        from . import routes
        routes.init_blueprints(app)
        db.create_all()

    return app


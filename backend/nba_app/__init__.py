from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

db = SQLAlchemy()
bcrypt = Bcrypt()

def create_app(config_class='config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt = JWTManager(app)
    CORS(app)

    from nba_app.routes.games import games_blueprint
    from nba_app.routes.players import players_blueprint
    from nba_app.routes.schedule import schedule_blueprint
    from nba_app.routes.teams import teams_blueprint
    from nba_app.routes.users import users_blueprint

    app.register_blueprint(games_blueprint)
    app.register_blueprint(players_blueprint)
    app.register_blueprint(schedule_blueprint)
    app.register_blueprint(teams_blueprint)
    app.register_blueprint(users_blueprint)

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    

    return app

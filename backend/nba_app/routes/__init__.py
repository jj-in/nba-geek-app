from .games import games_blueprint
from .players import players_blueprint
from .teams import teams_blueprint
from .schedule import schedule_blueprint
from .users import users_blueprint
# Import other blueprints in a similar fashion

# Optionally, you can define a function to register all blueprints to an app
def init_blueprints(app):
    app.register_blueprint(games_blueprint, url_prefix='/api')
    app.register_blueprint(players_blueprint, url_prefix='/api')
    app.register_blueprint(teams_blueprint, url_prefix='/api')
    app.register_blueprint(schedule_blueprint, url_prefix='/api')
    app.register_blueprint(users_blueprint, url_prefix='/api')
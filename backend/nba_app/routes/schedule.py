from nba_api.live.nba.endpoints import scoreboard
from flask import Blueprint, jsonify, request
from .services import games_data_service

schedule_blueprint = Blueprint('schedule_blueprint', __name__)

@schedule_blueprint.route('/schedule/live', methods=['GET'])
def fetch_live_scores():    
    sb_json = scoreboard.ScoreBoard().games.get_json()
    return sb_json

@schedule_blueprint.route('/schedule/<date>', methods=['GET'])
def fetch_old_scores(date):    
    scores = games_data_service.get_scoreboard_date(date)
    return jsonify(scores)

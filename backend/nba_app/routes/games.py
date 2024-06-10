from flask import Blueprint, jsonify, request
from .services import boxscore_data_service, games_data_service
import logging

games_blueprint = Blueprint('games_blueprint', __name__)

@games_blueprint.route('/games/<game_id>', methods=['GET'])
def get_game_detail(game_id):
    try:
        game_details = games_data_service.get_game_details(game_id)
        if game_details:
            return jsonify(game_details)
        else:
            return jsonify({'error': 'Box Score bio not found'}), 404
    except Exception as e:
        logging.error(f"Error fetching box score: {e}")
        return jsonify({'error': 'Failed to fetch box score'}), 500

@games_blueprint.route('/games/boxscore/traditional/<game_id>', methods=['GET'])
def get_traditional_boxscore(game_id):
    try:
        traditional_boxscore = boxscore_data_service.get_traditional_player_stats(game_id)
        if traditional_boxscore:
            return jsonify(traditional_boxscore)
        else:
            return jsonify({'error': 'Box Score traditional player stats not found'}), 404
    except Exception as e:
        logging.error(f"Error fetching box score: {e}")
        return jsonify({'error': 'Failed to fetch box score'}), 500
    

@games_blueprint.route('/games/boxscore/team_stats/<game_id>', methods=['GET'])
def get_team_stats_boxscore(game_id):
    try:
        team_stats = boxscore_data_service.get_traditional_team_stats(game_id)
        if team_stats:
            return jsonify(team_stats)
        else:
            return jsonify({'error': 'Box Score traditional player stats not found'}), 404
    except Exception as e:
        logging.error(f"Error fetching box score: {e}")
        return jsonify({'error': 'Failed to fetch box score'}), 500
    
    
@games_blueprint.route('/games/boxscore/advanced_player/<game_id>', methods=['GET'])
def get_advanced_player_boxscore(game_id):
    try:
        advanced_player_stats = boxscore_data_service.get_advanced_player_stats(game_id)
        if advanced_player_stats:
            return jsonify(advanced_player_stats)
        else:
            return jsonify({'error': 'Advanced player stats not found'}), 404
    except Exception as e:
        logging.error(f"Error fetching advanced player stats: {e}")
        return jsonify({'error': 'Failed to fetch advanced player stats'}), 500

@games_blueprint.route('/games/boxscore/advanced_team/<game_id>', methods=['GET'])
def get_advanced_team_boxscore(game_id):
    try:
        advanced_team_stats = boxscore_data_service.get_advanced_team_stats(game_id)
        if advanced_team_stats:
            return jsonify(advanced_team_stats)
        else:
            return jsonify({'error': 'Advanced team stats not found'}), 404
    except Exception as e:
        logging.error(f"Error fetching advanced team stats: {e}")
        return jsonify({'error': 'Failed to fetch advanced team stats'}), 500

@games_blueprint.route('/games/boxscore/hustle/<game_id>', methods=['GET'])
def get_hustle_boxscore(game_id):
    try:
        hustle_stats = boxscore_data_service.get_hustle_stats(game_id)
        if hustle_stats:
            return jsonify(hustle_stats)
        else:
            return jsonify({'error': 'Hustle stats not found'}), 404
    except Exception as e:
        logging.error(f"Error fetching hustle stats: {e}")
        return jsonify({'error': 'Failed to fetch hustle stats'}), 500

@games_blueprint.route('/games/boxscore/defensive/<game_id>', methods=['GET'])
def get_defensive_boxscore(game_id):
    try:
        defensive_stats = boxscore_data_service.get_defensive_stats(game_id)
        if defensive_stats:
            return jsonify(defensive_stats)
        else:
            return jsonify({'error': 'Defensive stats not found'}), 404
    except Exception as e:
        logging.error(f"Error fetching defensive stats: {e}")
        return jsonify({'error': 'Failed to fetch defensive stats'}), 500

@games_blueprint.route('/games/boxscore/tracking/<game_id>', methods=['GET'])
def get_tracking_boxscore(game_id):
    try:
        tracking_stats = boxscore_data_service.get_tracking_stats(game_id)
        if tracking_stats:
            return jsonify(tracking_stats)
        else:
            return
    except Exception as e:
        logging.error(f"Error fetching tracking stats: {e}")
        return jsonify({'error': 'Failed to fetch tracking stats'}), 500
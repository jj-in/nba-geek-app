from flask import Blueprint, jsonify, request
from ..models import SynergyData, db
from sqlalchemy import desc
import logging
from .services import player_data_service, static_data_service

players_blueprint = Blueprint('players_blueprint', __name__)

@players_blueprint.route('/players', methods=['GET'])
def find_player_id():
    try:
        full_name = request.args.get('name')
        player_id = player_data_service.get_player_id(full_name)
        return player_id
    except Exception as e:
        logging.error(f"Error searching for player: {e}")
        return jsonify({'error': 'Failed to find player'}), 500


@players_blueprint.route('/players/all')
def static_all_players():
    try:
        all_players = static_data_service.all_players()
        return jsonify(all_players)
    except Exception as e:
        logging.error(f"Error fetching all players: {e}")
        return jsonify({'error': 'Failed to fetch all players'}), 500

@players_blueprint.route('/players/active')
def static_active_players():
    try:
        active_players = static_data_service.active_players()
        return jsonify(active_players)
    except Exception as e:
        logging.error(f"Error fetching active players: {e}")
        return jsonify({'error': 'Failed to fetch active players'}), 500
    

@players_blueprint.route('/players/bio/<int:player_id>', methods=['GET'])
def get_player_bio(player_id):
    try:
        player_bio_json = player_data_service.get_bio_json(player_id)
        if player_bio_json:
            return jsonify(player_bio_json)
        else:
            return jsonify({'error': 'Player bio not found'}), 404
    except Exception as e:
        logging.error(f"Error fetching player bio: {e}")
        return jsonify({'error': 'Failed to fetch player bio'}), 500
    
@players_blueprint.route('/players/career_stats/<int:player_id>', methods=['GET'])
def get_player_career_stats(player_id):
    try:
        career_stats = player_data_service.get_career_stats_json(player_id)
        return jsonify(career_stats)
    except Exception as e:
        logging.error(f"Error fetching player career stats: {e}")
        return jsonify({'error': 'Failed to fetch player career stats'}), 500
    
@players_blueprint.route('/players/synergy', methods=['GET'])
def get_league_synergy_data():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 50, type=int)
    sort_by = request.args.get('sort_by', 'pts', type=str)
    order = request.args.get('order', 'desc', type=str)
    seasons = request.args.getlist('season')
    play_type = request.args.get('play_type', 'All', type=str)
    player_name = request.args.get('player', None, type=str)    
    team = request.args.get('team', None, type=str)
    min_games = request.args.get('min_games', None, type=int)
    min_poss = request.args.get('min_poss', None, type=int)
    min_ppp = request.args.get('min_ppp', None, type=float)



    query = db.session.query(SynergyData)    
    logging.info(query)
    if seasons and 'All' not in seasons:
        query = query.filter(SynergyData.season_id.in_(seasons))  # Accepting multiple seasons (range) but default to 2023-24
    if play_type != 'All':
        query = query.filter(SynergyData.play_type == play_type)
    if player_name is not None:
        query = query.filter(SynergyData.player_name == player_name)
    if team is not None:
        query = query.filter(SynergyData.team_abbreviation == team) #3 letter abbreviation that are standard for the active teams
    if min_games is not None:
        query = query.filter(SynergyData.gp >= min_games)
    if min_poss is not None:
        query = query.filter(SynergyData.poss >= min_poss)
    if min_ppp is not None:
        query = query.filter(SynergyData.ppp >= min_ppp)
  
    if order == 'desc':
        query = query.order_by(desc(getattr(SynergyData, sort_by)))
    else:
        query = query.order_by(getattr(SynergyData, sort_by))

    offset = (page - 1) * per_page
    paginated_data = query.offset(offset).limit(per_page).all()
    total = query.count()
    total_pages = (total + per_page - 1) // per_page
    logging.info(paginated_data)
    response = {
        "data": [item.to_dict() for item in paginated_data],
        "total": total,
        "pages": total_pages,
        "current_page": page
    }

    return jsonify(response)

@players_blueprint.route('/players/synergy/<int:player_id>', methods=['GET'])
def get_player_synergy_data(player_id):
    try:
        result = db.session.query(SynergyData).filter_by(player_id=player_id).all()
        response_data = [item.to_dict() for item in result]   
        if response_data:
            return jsonify(response_data)
        else:
            return jsonify({'unavailable': 'No Synergy stats available for this player'})
    except Exception as e:
        logging.error(f"Error fetching player synergy data: {e}")
        return jsonify({'error': 'Failed to fetch player synergy data'}), 500

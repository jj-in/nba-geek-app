from flask import Blueprint, jsonify, request
from .services import team_data_service, static_data_service

teams_blueprint = Blueprint('teams_blueprint', __name__)

@teams_blueprint.route('/teams/active')
def static_all_teams():
    teams = static_data_service.active_teams()
    return jsonify(teams)

@teams_blueprint.route('/teams/info/<team_id>', methods=['GET'])
def get_team_by_id(team_id):
    team = team_data_service.get_team_by_id(team_id)
    return jsonify(team)

@teams_blueprint.route('/teams/roster/<team_id>/<season>', methods=['GET'])
def get_team_roster(team_id, season):
    roster = team_data_service.get_team_roster(team_id, season)
    if roster is not None:
        # Convert DataFrame to a list of dictionaries
        roster_list = roster.to_dict('records')
        # Return the JSON response
        return jsonify(roster_list)
    else:
        return jsonify({'error': 'Could not fetch the team roster'}), 500

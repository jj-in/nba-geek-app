from .static_data_functions import get_players, get_active_players, get_teams, find_team_name_by_id

class StaticDataService:
    
    @staticmethod
    def all_players():
        players_list = get_players()
        formatted_players = [{"id": player["id"], "full_name": player["full_name"]} for player in players_list]
        return formatted_players

    @staticmethod
    def active_players():
        players_list = get_active_players()
        formatted_players = [{"id": player["id"], "full_name": player["full_name"]} for player in players_list]
        return formatted_players
    
    @staticmethod
    def active_teams():
        teams_list = get_teams()
        return teams_list

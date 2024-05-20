from .static_data_functions import find_team_name_by_id
from .player_functions import (
    fetch_complete_career_stats_json, 
    fetch_player_info,
    fetch_player_id
)
from .team_functions import fetch_team_roster
from .boxscore_functions import(  
    fetch_boxscore_summary,
    fetch_boxscore_traditional_player,
    fetch_boxscore_traditional_team,
    fetch_boxscore_hustle,
    fetch_boxscore_defensive,
    fetch_boxscore_tracking,
    fetch_boxscore_advanced_player,
    fetch_boxscore_advanced_team,
    fetch_boxscore_matchups,
    fetch_boxscore_usage
)
from .games_functions import(  
    fetch_live_scores,
    fetch_scoreboard_date,
    fetch_game_details
)
from .playbyplay_functions import(  
    fetch_game_pbp
)

class PlayerData:

    @classmethod
    def get_player_id(cls, full_name):
        player_id = fetch_player_id(full_name)
        return player_id
    
    @classmethod
    def get_career_stats_json(cls, player_id):
        career_stats = fetch_complete_career_stats_json(player_id)
        return career_stats
    
    @classmethod
    def get_bio_json(cls, player_id):
        player_bio = fetch_player_info(player_id)
        return player_bio   

class TeamData:

    @classmethod
    def get_team_roster(cls, team_id, season):
        team_roster = fetch_team_roster(team_id, season)
        return team_roster
    
    @classmethod
    def get_team_by_id(cls, team_id):
        team_dict = find_team_name_by_id(team_id)
        return team_dict

class BoxScoreData:
    """ Returning normalized_dict's for each route to jsonify the relevant box score type"""

    @classmethod
    def get_boxscore_summary(cls, game_id):
        boxscore_summary = fetch_boxscore_summary(game_id)
        return boxscore_summary
    
    @classmethod
    def get_traditional_player_stats(cls, game_id):
        traditional_stats = fetch_boxscore_traditional_player(game_id)
        return traditional_stats

    @classmethod
    def get_traditional_team_stats(cls, game_id):
        traditional_stats = fetch_boxscore_traditional_team(game_id)
        return traditional_stats
    
    @classmethod
    def get_advanced_player_stats(cls, game_id):
        advanced_stats = fetch_boxscore_advanced_player(game_id)
        return advanced_stats
    
    @classmethod
    def get_advanced_team_stats(cls, game_id):
        advanced_stats = fetch_boxscore_advanced_team(game_id)
        return advanced_stats

    @classmethod
    def get_hustle_stats(cls, game_id):
        hustle_stats = fetch_boxscore_hustle(game_id)
        return hustle_stats
    
    @classmethod
    def get_defensive_stats(cls, game_id):
        defensive_stats = fetch_boxscore_defensive(game_id)
        return defensive_stats
    
    @classmethod
    def get_tracking_stats(cls, game_id):
        tracking_stats = fetch_boxscore_tracking(game_id)
        return tracking_stats

    @classmethod
    def get_matchup_stats(cls, game_id):
        matchup_stats = fetch_boxscore_matchups(game_id)
        return matchup_stats
    
    @classmethod
    def get_usage_stats(cls, game_id):
        usage_stats = fetch_boxscore_usage(game_id)
        return usage_stats
    
class GamesData:
    
    @classmethod
    def get_live_scoreboard(cls):
        scoreboard = fetch_live_scores()
        return scoreboard
    
    @classmethod
    def get_scoreboard_date(cls, date):
        scoreboard = fetch_scoreboard_date(date)
        return scoreboard
    
    @classmethod
    def get_game_details(cls, game_id):
        game = fetch_game_details(game_id)
        return game


class PlayByPlayData:
    
    @classmethod
    def get_full_pbp(cls, game_id):
        pbp_data = fetch_game_pbp(game_id)
        return pbp_data
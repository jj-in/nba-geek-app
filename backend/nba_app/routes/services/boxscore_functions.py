from nba_api.live.nba.endpoints import scoreboard
from nba_api.stats.endpoints import boxscorehustlev2, boxscoresummaryv2, boxscorematchupsv3, boxscoredefensivev2, scoreboardv2, playbyplayv3, boxscoretraditionalv2, boxscoreadvancedv3, boxscoremiscv3, boxscoreusagev3, boxscoreplayertrackv3
import time, json
import logging
import pandas as pd

logging.basicConfig(level=logging.INFO)

def fetch_boxscore_summary(game_id):
    # notably includes referee data and team data+stats
    try:
        box = boxscoresummaryv2.BoxScoreSummaryV2(game_id=game_id)
        summary_data = box.get_normalized_dict()
        return summary_data
    except Exception as e:
        logging.error(f"Error fetching box score summary: {e}")
        return None

def fetch_boxscore_traditional_player(game_id):
    # Consolidating the various datasets returned by BoxScoreTraditionalV2 and organizing them into a list of dictionaries
    # Each player and team is their own dictionary with all their stats
    try:
        box = boxscoretraditionalv2.BoxScoreTraditionalV2(game_id=game_id)
        data_sets = box.get_normalized_dict()
        if not data_sets:
            logging.error(f"No data returned for game {game_id}.")
            return None
        
        team_players = {}
        player_stats = data_sets.get('PlayerStats', [])
        for player in player_stats:
            team_code = player.get('TEAM_ABBREVIATION')
            if team_code not in team_players:
                team_players[team_code] = []
            team_players[team_code].append(player)

        if not team_players:
            logging.info("No player stats found for the game.")
            return None
        return team_players

    except Exception as e:
        logging.error(f"Error fetching and consolidating box score: {e}")
        return None

def fetch_boxscore_traditional_team(game_id):
    # Consolidating datasets returned by BoxScoreTraditionalV2 to only return team stats data
    try:
        box = boxscoretraditionalv2.BoxScoreTraditionalV2(game_id=game_id)
        data_sets = box.get_normalized_dict()
        if not data_sets:
            logging.error(f"No data returned for game {game_id}.")
            return None

        team_stats = data_sets['TeamStats']
        return team_stats

    except Exception as e:
        logging.error(f"Error fetching and consolidating box score: {e}")
        return None

def fetch_boxscore_advanced_player(game_id):
    try:
        box_score = boxscoreadvancedv3.BoxScoreAdvancedV3(game_id=game_id)
        player_data = box_score.player_stats.get_data_frame()
        player_data_list = player_data.to_dict(orient='records')
        team_players = {}
        for player in player_data_list:
            team_code = player.get('teamTricode')
            if team_code not in team_players:
                team_players[team_code] = []
            team_players[team_code].append(player)
        return team_players
    except Exception:
        return {'message': 'no data for this game'}


def fetch_boxscore_advanced_team(game_id):
    try:
        box_score = boxscoreadvancedv3.BoxScoreAdvancedV3(game_id=game_id)
        advanced_team_stats = box_score.get_normalized_dict()
        return advanced_team_stats
    except Exception:
        return {'message': 'no data for this game'}
    
def fetch_boxscore_hustle(game_id):
    try:
        box_score = boxscorehustlev2.BoxScoreHustleV2(game_id=game_id)
        player_data = box_score.player_stats.get_data_frame()
        player_data_list = player_data.to_dict(orient='records')
        team_players = {}
        for player in player_data_list:
            team_code = player.get('teamTricode')
            if team_code not in team_players:
                team_players[team_code] = []
            team_players[team_code].append(player)
        return team_players
    except Exception:
        return {'message': 'no data for this game'}


def fetch_boxscore_defensive(game_id):
    try:
        box_score = boxscoredefensivev2.BoxScoreDefensiveV2(game_id=game_id)
        player_data = box_score.player_stats.get_data_frame()
        player_data_list = player_data.to_dict(orient='records')
        team_players = {}
        for player in player_data_list:
            team_code = player.get('teamTricode')
            if team_code not in team_players:
                team_players[team_code] = []
            team_players[team_code].append(player)
        return team_players
    except Exception:
        return {'message': 'no data for this game'}


def fetch_boxscore_tracking(game_id):
    try:
        box_score = boxscoreplayertrackv3.BoxScorePlayerTrackV3(game_id=game_id)
        player_data = box_score.player_stats.get_data_frame()
        player_data_list = player_data.to_dict(orient='records')
        team_players = {}
        for player in player_data_list:
            team_code = player.get('teamTricode')
            if team_code not in team_players:
                team_players[team_code] = []
            team_players[team_code].append(player)
        return team_players
    except Exception:
        return {'message': 'no data for this game'}


def fetch_boxscore_matchups(game_id):
    try:
        box = boxscorematchupsv3.BoxScoreMatchupsV3(game_id=game_id)
        player_data = box.player_stats.get_data_frame()
        player_data_list = player_data.to_dict(orient='records')
        team_players = {}
        for player in player_data_list:
            team_code = player.get('teamTricode')
            if team_code not in team_players:
                team_players[team_code] = []
            team_players[team_code].append(player)
        return team_players
    except Exception:
        return {'message': 'no data for this game'}

def fetch_boxscore_usage(game_id):
    try:
        box = boxscoreusagev3.BoxScoreUsageV3(game_id=game_id)
        player_data = box.player_stats.get_data_frame()
        player_data_list = player_data.to_dict(orient='records')
        team_players = {}
        for player in player_data_list:
            team_code = player.get('teamTricode')
            if team_code not in team_players:
                team_players[team_code] = []
            team_players[team_code].append(player)
        return team_players
    except Exception:
        return {'message': 'no data for this game'}
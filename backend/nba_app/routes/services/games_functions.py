import logging
from nba_api.live.nba.endpoints import scoreboard
from nba_api.stats.endpoints import boxscoresummaryv2, scoreboardv2
from .formatting_functions import format_completed_game_details, format_future_game_details

# this variable goes into fetch_game_details. The nba_api is bugged when fetching older games they will say 'Scheduled' instead of 'Final'
# so we include this variable because only current season games should be 'scheduled'
curr_season = '2023-24'

def fetch_live_scores():
    try:
        live_scores = scoreboard.ScoreBoard().games.get_dict()        
        if not live_scores:
            logging.error(f"No live scoreboard data.")
            return None
        return live_scores

    except Exception as e:
        logging.error(f"Error fetching live score data: {e}")
        return None

def fetch_date_game_ids(game_date):
    try:
        scoreboard = scoreboardv2.ScoreboardV2(game_date=game_date, league_id='00', day_offset=0)
        
        # Get normalized data (dict format) for easier access, then convert to list
        data_sets = scoreboard.get_normalized_dict()
        game_headers = data_sets.get('GameHeader', [])
        game_ids = {game['GAME_ID'] for game in game_headers}
        ids_list = list(game_ids)

        return ids_list
        
    except Exception as e:
        print(f"An error occurred: {e}")
        return {}

def fetch_game_details(game_id):
    try:
        game = boxscoresummaryv2.BoxScoreSummaryV2(game_id=game_id)
        game_summary = game.get_normalized_dict()
        if game_summary:
            game_status = game_summary["GameSummary"][0]["GAME_STATUS_TEXT"]
            game_season = game_summary["GameSummary"][0]["SEASON"]
            if game_status == "Final" or game_season != '2023':
                return format_completed_game_details(game_summary)
            else:
                return format_future_game_details(game_summary)
        else:
            logging.error(f"No summary data for that game id.")
            return None 
    except Exception as e:
        logging.error(f"Error fetching summary: {e}")
        return None
    
def fetch_old_games(date):
    try:
        ids_list = fetch_date_game_ids(date)
        games = [fetch_game_details(id) for id in ids_list]
        return games
    except Exception as e:
        logging.error(f"Error fetching summary: {e}")
        return None

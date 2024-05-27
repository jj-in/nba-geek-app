import time, json
import logging
import pandas as pd
from nba_api.live.nba.endpoints import scoreboard
from nba_api.stats.endpoints import boxscoresummaryv2, scoreboardv2
from .formatting_functions import format_completed_game_details, format_future_game_details

logging.basicConfig(level=logging.INFO)

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

def fetch_scoreboard_date(game_date):
        # Initialize the ScoreboardV2 with the desired parameters
        # Offsetting (-1) goes back a day, (+1) goes forward day, etc
    try:
        scoreboard_info = scoreboard.ScoreboardV2(game_date=game_date)
        scoreboard_data = scoreboard_info.get_dict()
        return {'GameHeader': scoreboard_data['resultSets'][0]['rowSet']}
    except Exception as e:
        logging.error(f"Error fetching scoreboard data for {game_date}: {e}")
        return None


def fetch_game_details(game_id):
    try:
        game = boxscoresummaryv2.BoxScoreSummaryV2(game_id=game_id)
        game_summary = game.get_normalized_dict()
        if game_summary:
            game_status = game_summary["GameSummary"][0]["GAME_STATUS_TEXT"]
            if game_status == "Final":
                return format_completed_game_details(game_summary)
            else:
                return format_future_game_details(game_summary)
        else:
            logging.error(f"No summary data for that game id.")
            return None 
        
    except Exception as e:
        logging.error(f"Error fetching summary: {e}")
        return None

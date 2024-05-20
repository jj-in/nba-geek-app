from nba_api.live.nba.endpoints import scoreboard
from nba_api.stats.endpoints import boxscorehustlev2, boxscoresummaryv2, boxscorematchupsv3, boxscoredefensivev2, scoreboardv2, playbyplayv3, boxscoretraditionalv2, boxscoreadvancedv3, boxscoremiscv3, boxscoreusagev3, boxscoreplayertrackv3
import logging
import pandas as pd

logging.basicConfig(level=logging.INFO)


def fetch_game_pbp(game_id):
    # Returning regular play by play data for an entire game
    try:
        pbp_data = playbyplayv3.PlayByPlayV3(game_id=game_id)
        play_by_play_data = pbp_data.play_by_play.get_data_frame()
        if not play_by_play_data:
            logging.error(f"No data returned for game {game_id}.")
            return None
        return play_by_play_data

    except Exception as e:
        logging.error(f"Error fetching play by play data: {e}")
        return None

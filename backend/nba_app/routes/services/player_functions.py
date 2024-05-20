from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, commonplayerinfo, playergamelog, playerdashboardbyyearoveryear
from collections import defaultdict
import json
import logging
import pandas as pd

logging.basicConfig(level=logging.INFO)

def fetch_player_id(full_name):
    try:
        player_info = players.find_players_by_full_name(full_name)
        if player_info:
            return player_info[0]['id']
        else:
            logging.error(f"No player found with name {full_name}.")
            return None
    except Exception as e:
        logging.error(f"Error fetching player ID: {e}")
        return None

def get_player_seasons_career_stats_json(player_id, mode):
    """This fetches just stats by regular season. mode must be 'Totals', 'PerGame', or 'Per36'"""
    try:
        career_stats = playercareerstats.PlayerCareerStats(per_mode36=mode, player_id=player_id)
        career_df = career_stats.get_data_frames()[0]
        career = career_df.to_dict(orient='records')
        # Save as standard JSON array
        with open('sample_player_career_stats.json', 'w') as f:
            json.dump(career, f, indent=4)
    except Exception as e:
        logging.error(f"Error fetching player game logs: {e}")

def get_player_seasons_career_stats_df(player_id, mode):
    """This fetches just stats by regular season. mode must be 'Totals', 'PerGame', or 'Per36'"""
    try:
        career_stats = playercareerstats.PlayerCareerStats(per_mode36=mode, player_id=player_id)
        career_df = career_stats.get_data_frames()[0]
        return career_df
    except Exception as e:
        logging.error(f"Error fetching player game logs: {e}")

def fetch_complete_career_stats_json(player_id):
    """This fetches just career stats including postseason, etc. mode must be 'Totals', 'PerGame', or 'Per36'"""
    try:
        career_stats = playercareerstats.PlayerCareerStats(per_mode36='PerGame', player_id=player_id)
        
        # Get normalized data (dict format) for easier access
        data_sets = career_stats.get_normalized_dict()
        
        return data_sets

    except Exception as e:
        print(f"Error fetching and consolidating scores: {e}")
        return None
    
def fetch_player_info(player_id):
    try:
        player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
        full_info = player_info.get_data_frames()[0]
        # Filter the desired fields
        filtered_info = full_info[['PERSON_ID', 'FIRST_NAME', 'LAST_NAME', 'DISPLAY_FIRST_LAST',
                                    'BIRTHDATE', 'SCHOOL', 'HEIGHT', 'WEIGHT', 'JERSEY', 'POSITION',
                                    'TEAM_ID', 'TEAM_ABBREVIATION', 'FROM_YEAR', 'TO_YEAR',
                                    'DRAFT_YEAR', 'DRAFT_ROUND', 'DRAFT_NUMBER']].iloc[0].to_dict()
        # Process BIRTHDATE to remove time 'T'
        filtered_info['BIRTHDATE'] = filtered_info['BIRTHDATE'].split('T')[0]
        return filtered_info
    except Exception as e:
        print(f"Error fetching and consolidating scores: {e}")
        return None

def get_player_seasons(player_id):
    try:
        career_stats = playercareerstats.PlayerCareerStats(player_id=player_id)
        career_df = career_stats.get_data_frames()[0]
        seasons_list = career_df['SEASON_ID'].unique().tolist()
        return seasons_list
    except Exception as e:
        logging.error(f"Error fetching player game logs: {e}")

def get_player_season_game_logs(player_id, season_id):
    try:
        game_log = playergamelog.PlayerGameLog(player_id=player_id, season=season_id)
        return game_log.get_data_frames()[0]
    except Exception as e:
        logging.error(f"Error fetching player game logs: {e}")

def preprocess_game_logs(df):
    def parse_matchup(matchup):
        if 'vs.' in matchup:
            teams = matchup.split(' vs. ')
            home_team, opp_team = teams[0], teams[1]
            home_away = 'Home'
        elif '@' in matchup:
            teams = matchup.split(' @ ')
            home_team, opp_team = teams[1], teams[0]  # Note the order is swapped for away games
            home_away = 'Away'
        else:
            home_team, opp_team, home_away = None, None, None  # Handle unexpected format
        return home_team, opp_team, home_away

    # Apply the function and assign new columns
    df[['team_id', 'opp_team_id', 'home_away']] = df.apply(lambda row: pd.Series(parse_matchup(row['MATCHUP'])), axis=1)
    return df

def filter_game_log(df, season=None, team_id=None, opp_team_id=None, home_away=None, min_minutes=None):
    # Filter by season
    if season:
        df = df[df['SEASON_ID'] == season]
    # Filter by team_id extracted from Matchup
    if team_id:
        df = df[df['team_id'] == team_id]
    # Filter by opponent team_id extracted from Matchup
    if opp_team_id:
        df = df[df['opp_team_id'] == opp_team_id]
    # Filter by home/away
    if home_away:
        df = df[df['home_away'] == home_away]
    # Filter by minimum minutes played
    if min_minutes:
        df['MIN'] = df['MIN'].astype(str)
        df['MIN'] = df['MIN'].str.replace(":", ".").astype(float)
        df = df[df['MIN'] >= min_minutes]
    
    return df

def get_player_career_win_loss(player_id, season_ids, season=None, team_id=None, opp_team_id=None, home_away=None, min_minutes=None):
    career_win_loss = defaultdict(int)  # Default to 0 for each key
    
    # Determine if preprocessing is needed based on filter requirements
    needs_preprocessing = team_id or opp_team_id or home_away

    for season_id in season_ids:
        season_game_logs = get_player_season_game_logs(player_id, season_id)
        
        if season_game_logs is not None:
            # Preprocess the DataFrame if necessary
            if needs_preprocessing:
                season_game_logs = preprocess_game_logs(season_game_logs)

            # Generate df with optional filters
            filtered_game_log = filter_game_log(season_game_logs, season=season, team_id=team_id, opp_team_id=opp_team_id, home_away=home_away, min_minutes=min_minutes)
            
            # Aggregate win-loss records for the season
            season_win_loss = filtered_game_log['WL'].value_counts().to_dict()
            
            # Return single season if filtered by season
            if season_id == season:
                return season_win_loss
            # Update career totals
            else:
                for result, count in season_win_loss.items():
                    career_win_loss[result] += count
        else:
            logging.warning(f"Could not fetch game logs for season {season_id}")
    
    return dict(career_win_loss)

def get_player_dash(player_id, season_id):
    try:
        dash = playerdashboardbyyearoveryear.PlayerDashboardByYearOverYear(player_id=player_id, season=season_id, rank='Y')
        df = dash.get_data_frames()[0]
        return df.to_csv('path_to_your_file4.csv', index=False)
    except Exception as e:
        logging.error(f"Error fetching player dash: {e}")


# def fetch_filtered_career_stats_json(player_id, mode, stats_type):
#     """This fetches just career stats including postseason, etc. mode must be 'Totals', 'PerGame', or 'Per36'"""
#     try:
#         career_stats = playercareerstats.PlayerCareerStats(per_mode36=mode, player_id=player_id)
        
#         # Get normalized data (dict format) for easier access
#         data_sets = career_stats.get_normalized_dict()
        
#         # If specific stats are requested, filter data_sets accordingly
#         if stats_type != 'all':
#             filtered_data = {k: v for k, v in data_sets.items() if stats_type in k.lower()}
#             json_data = json.dumps(filtered_data, indent=4)
#         else:
#             json_data = json.dumps(data_sets, indent=4)

#         return json_data

#     except Exception as e:
#         print(f"Error fetching and consolidating scores: {e}")
#         return None
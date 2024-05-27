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
        return career_df['SEASON_ID'].unique().tolist()
    except Exception as e:
        logging.error(f"Error fetching player seasons: {e}")
        return None
    
def get_player_season_game_logs(player_id, season_id):
    try:
        game_log = playergamelog.PlayerGameLog(player_id=player_id, season=season_id)
        return game_log.get_data_frames()[0]
    except Exception as e:
        logging.error(f"Error fetching player game logs: {e}")
        return None
    
def preprocess_game_logs(df):
    def parse_matchup(matchup):
        if 'vs.' in matchup:
            teams = matchup.split(' vs. ')
            home_team, opp_team = teams[0], teams[1]
            home_away = 'Home'
        elif '@' in matchup:
            teams = matchup.split(' @ ')
            home_team, opp_team = teams[1], teams[0]
            home_away = 'Away'
        else:
            home_team, opp_team, home_away = None, None, None
        return home_team, opp_team, home_away

    df[['team_id', 'opp_team_id', 'home_away']] = df.apply(lambda row: pd.Series(parse_matchup(row['MATCHUP'])), axis=1)
    return df

def filter_game_log(df, season=None, team_id=None, opp_team_id=None, home_away=None, min_minutes=None):
    if season:
        df = df[df['SEASON_ID'] == season]
    if team_id:
        df = df[df['team_id'] == team_id]
    if opp_team_id:
        df = df[df['opp_team_id'] == opp_team_id]
    if home_away:
        df = df[df['home_away'] == home_away]
    if min_minutes:
        df['MIN'] = df['MIN'].astype(str).str.replace(":", ".").astype(float)
        df = df[df['MIN'] >= min_minutes]
    return df


def get_player_career_win_loss(player_id, season_ids, season=None, team_id=None, opp_team_id=None, home_away=None, min_minutes=None):
    career_win_loss = defaultdict(int)
    needs_preprocessing = team_id or opp_team_id or home_away

    for season_id in season_ids:
        season_game_logs = get_player_season_game_logs(player_id, season_id)
        if season_game_logs is not None:
            if needs_preprocessing:
                season_game_logs = preprocess_game_logs(season_game_logs)
            filtered_game_log = filter_game_log(season_game_logs, season=season, team_id=team_id, opp_team_id=opp_team_id, home_away=home_away, min_minutes=min_minutes)
            season_win_loss = filtered_game_log['WL'].value_counts().to_dict()
            if season_id == season:
                return season_win_loss
            for result, count in season_win_loss.items():
                career_win_loss[result] += count
        else:
            logging.warning(f"Could not fetch game logs for season {season_id}")

    return dict(career_win_loss)

def fetch_player_game_logs_and_win_loss(player_id, season=None, team_id=None, opp_team_id=None, home_away=None, min_minutes=None):
    seasons = get_player_seasons(player_id)
    if not seasons:
        return {'error': 'Could not fetch player seasons'}

    all_game_logs = []
    for season_id in seasons:
        season_game_logs = get_player_season_game_logs(player_id, season_id)
        if season_game_logs is not None:
            all_game_logs.append(season_game_logs.to_dict(orient='records'))
        else:
            logging.warning(f"Could not fetch game logs for season {season_id}")

    win_loss_stats = get_player_career_win_loss(player_id, seasons, season=season, team_id=team_id, opp_team_id=opp_team_id, home_away=home_away, min_minutes=min_minutes)

    return {
        'game_logs': all_game_logs,
        'win_loss_stats': win_loss_stats
    }
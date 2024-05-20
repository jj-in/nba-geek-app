from nba_api.stats.endpoints import commonteamroster
import logging
logging.basicConfig(level=logging.INFO)

def fetch_team_roster(team_id, season):
    try:
        roster_info = commonteamroster.CommonTeamRoster(team_id=team_id, season=season)
        full_info = roster_info.get_data_frames()[0]
        return full_info
    except Exception as e:
        logging.error(f"Error fetching team roster: {e}")
        return None
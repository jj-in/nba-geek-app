from .api_classes import(  
    PlayerData,
    TeamData,
    BoxScoreData,
    GamesData,
    PlayByPlayData
)
from .static_data_classes import StaticDataService

player_data_service = PlayerData()
team_data_service = TeamData()
boxscore_data_service = BoxScoreData()
games_data_service = GamesData()
pbp_data_service = PlayByPlayData()
static_data_service = StaticDataService()
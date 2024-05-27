import pytest
from nba_app.models import SynergyData

def test_find_player_id(test_client, mocker):
    mock_get_player_id = mocker.patch('nba_app.routes.services.player_data_service.get_player_id')
    mock_get_player_id.return_value = "12345"

    response = test_client.get('/players?name=LeBron%20James')
    assert response.status_code == 200
    assert response.get_data(as_text=True) == "12345"

def test_static_all_players(test_client, mocker):
    mock_all_players = mocker.patch('nba_app.routes.services.static_data_service.all_players')
    mock_all_players.return_value = [{"id": 1, "name": "LeBron James"}]

    response = test_client.get('/players/all')
    assert response.status_code == 200
    assert response.get_json() == [{"id": 1, "name": "LeBron James"}]

def test_static_active_players(test_client, mocker):
    mock_active_players = mocker.patch('nba_app.routes.services.static_data_service.active_players')
    mock_active_players.return_value = [{"id": 1, "name": "LeBron James"}]

    response = test_client.get('/players/active')
    assert response.status_code == 200
    assert response.get_json() == [{"id": 1, "name": "LeBron James"}]

def test_get_player_bio(test_client, mocker):
    mock_get_bio_json = mocker.patch('nba_app.routes.services.player_data_service.get_bio_json')
    mock_get_bio_json.return_value = {"id": 1, "bio": "Some bio"}

    response = test_client.get('/players/bio/1')
    assert response.status_code == 200
    assert response.get_json() == {"id": 1, "bio": "Some bio"}

def test_get_player_career_stats(test_client, mocker):
    mock_get_career_stats_json = mocker.patch('nba_app.routes.services.player_data_service.get_career_stats_json')
    mock_get_career_stats_json.return_value = {"id": 1, "stats": "Career stats"}

    response = test_client.get('/players/career_stats/1')
    assert response.status_code == 200
    assert response.get_json() == {"id": 1, "stats": "Career stats"}

def test_get_league_synergy_data(test_client, init_database):
    response = test_client.get('/players/synergy?season=2021&play_type=All')
    assert response.status_code == 200
    assert 'data' in response.get_json()

def test_get_player_synergy_data(test_client, init_database, mocker):
    mock_query = mocker.patch('nba_app.routes.players.db.session.query')
    mock_query.return_value.filter_by.return_value.all.return_value = [
        SynergyData(player_id=1, player_name="Test Player", season_id="2021-22", team_id=1, team_abbreviation="TP",
                    play_type="Test Play", gp=10, ppp=1.0, poss=10, pts=10, fg_pct=0.5, efg_pct=0.6, frequency=0.1,
                    score_frequency=0.2, percentile=0.3)
    ]

    response = test_client.get('/players/synergy/1')
    assert response.status_code == 200
    assert 'unavailable' not in response.get_json()

    mock_query.return_value.filter_by.return_value.all.return_value = []
    response = test_client.get('/players/synergy/1')
    assert response.status_code == 200
    assert response.get_json() == {'unavailable': 'No Synergy stats available for this player'}

def test_get_game_logs(test_client, mocker):
    mock_get_game_logs_and_win_loss = mocker.patch('nba_app.routes.services.player_data_service.get_game_logs_and_win_loss')
    mock_get_game_logs_and_win_loss.return_value = [{"id": 1, "log": "Game log"}]

    response = test_client.get('/players/game_logs/1/')
    assert response.status_code == 200
    assert response.get_json() == [{"id": 1, "log": "Game log"}]

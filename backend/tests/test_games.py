import pytest
from flask import Flask
from nba_app import create_app 
from nba_app.routes.services import boxscore_data_service, games_data_service

def test_get_game_detail(test_client, mocker):
    mock_get_game_details = mocker.patch('nba_app.routes.services.games_data_service.get_game_details')
    mock_get_game_details.return_value = {"game_id": "12345", "details": "some details"}

    response = test_client.get('/games/12345')
    assert response.status_code == 200
    assert response.get_json() == {"game_id": "12345", "details": "some details"}

    mock_get_game_details.return_value = None
    response = test_client.get('/games/12345')
    assert response.status_code == 404
    assert response.get_json() == {'error': 'Box Score bio not found'}

def test_get_traditional_boxscore(test_client, mocker):
    mock_get_traditional_player_stats = mocker.patch('nba_app.routes.services.boxscore_data_service.get_traditional_player_stats')
    mock_get_traditional_player_stats.return_value = {"game_id": "12345", "traditional_stats": "some stats"}

    response = test_client.get('/games/boxscore/traditional/12345')
    assert response.status_code == 200
    assert response.get_json() == {"game_id": "12345", "traditional_stats": "some stats"}

    mock_get_traditional_player_stats.return_value = None
    response = test_client.get('/games/boxscore/traditional/12345')
    assert response.status_code == 404
    assert response.get_json() == {'error': 'Box Score traditional player stats not found'}

def test_get_team_stats_boxscore(test_client, mocker):
    mock_get_traditional_team_stats = mocker.patch('nba_app.routes.services.boxscore_data_service.get_traditional_team_stats')
    mock_get_traditional_team_stats.return_value = {"game_id": "12345", "team_stats": "some stats"}

    response = test_client.get('/games/boxscore/team_stats/12345')
    assert response.status_code == 200
    assert response.get_json() == {"game_id": "12345", "team_stats": "some stats"}

    mock_get_traditional_team_stats.return_value = None
    response = test_client.get('/games/boxscore/team_stats/12345')
    assert response.status_code == 404
    assert response.get_json() == {'error': 'Box Score traditional player stats not found'}

def test_get_advanced_player_boxscore(test_client, mocker):
    mock_get_advanced_player_stats = mocker.patch('nba_app.routes.services.boxscore_data_service.get_advanced_player_stats')
    mock_get_advanced_player_stats.return_value = {"game_id": "12345", "advanced_player_stats": "some stats"}

    response = test_client.get('/games/boxscore/advanced_player/12345')
    assert response.status_code == 200
    assert response.get_json() == {"game_id": "12345", "advanced_player_stats": "some stats"}

    mock_get_advanced_player_stats.return_value = None
    response = test_client.get('/games/boxscore/advanced_player/12345')
    assert response.status_code == 404
    assert response.get_json() == {'error': 'Advanced player stats not found'}

def test_get_advanced_team_boxscore(test_client, mocker):
    mock_get_advanced_team_stats = mocker.patch('nba_app.routes.services.boxscore_data_service.get_advanced_team_stats')
    mock_get_advanced_team_stats.return_value = {"game_id": "12345", "advanced_team_stats": "some stats"}

    response = test_client.get('/games/boxscore/advanced_team/12345')
    assert response.status_code == 200
    assert response.get_json() == {"game_id": "12345", "advanced_team_stats": "some stats"}

    mock_get_advanced_team_stats.return_value = None
    response = test_client.get('/games/boxscore/advanced_team/12345')
    assert response.status_code == 404
    assert response.get_json() == {'error': 'Advanced team stats not found'}

def test_get_hustle_boxscore(test_client, mocker):
    mock_get_hustle_stats = mocker.patch('nba_app.routes.services.boxscore_data_service.get_hustle_stats')
    mock_get_hustle_stats.return_value = {"game_id": "12345", "hustle_stats": "some stats"}

    response = test_client.get('/games/boxscore/hustle/12345')
    assert response.status_code == 200
    assert response.get_json() == {"game_id": "12345", "hustle_stats": "some stats"}

    mock_get_hustle_stats.return_value = None
    response = test_client.get('/games/boxscore/hustle/12345')
    assert response.status_code == 404
    assert response.get_json() == {'error': 'Hustle stats not found'}

def test_get_defensive_boxscore(test_client, mocker):
    mock_get_defensive_stats = mocker.patch('nba_app.routes.services.boxscore_data_service.get_defensive_stats')
    mock_get_defensive_stats.return_value = {"game_id": "12345", "defensive_stats": "some stats"}

    response = test_client.get('/games/boxscore/defensive/12345')
    assert response.status_code == 200
    assert response.get_json() == {"game_id": "12345", "defensive_stats": "some stats"}

    mock_get_defensive_stats.return_value = None
    response = test_client.get('/games/boxscore/defensive/12345')
    assert response.status_code == 404
    assert response.get_json() == {'error': 'Defensive stats not found'}

def test_get_tracking_boxscore(test_client, mocker):
    mock_get_tracking_stats = mocker.patch('nba_app.routes.services.boxscore_data_service.get_tracking_stats')
    mock_get_tracking_stats.return_value = {"game_id": "12345", "tracking_stats": "some stats"}

    response = test_client.get('/games/boxscore/tracking/12345')
    assert response.status_code == 200
    assert response.get_json() == {"game_id": "12345", "tracking_stats": "some stats"}

    mock_get_tracking_stats.return_value = None
    response = test_client.get('/games/boxscore/tracking/12345')
    assert response.status_code == 404
    assert response.get_json() == {'error': 'Tracking stats not found'}

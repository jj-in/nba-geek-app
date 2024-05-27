import pandas as pd
import pytest
from flask import Flask
from nba_app import create_app
from nba_app.routes.services import team_data_service, static_data_service

def test_static_all_teams(test_client, mocker):
    mock_active_teams = mocker.patch('nba_app.routes.services.static_data_service.active_teams')
    mock_active_teams.return_value = [{"id": 1, "name": "Lakers"}]

    response = test_client.get('/teams/active')
    assert response.status_code == 200
    assert response.get_json() == [{"id": 1, "name": "Lakers"}]

def test_get_team_by_id(test_client, mocker):
    mock_get_team_by_id = mocker.patch('nba_app.routes.services.team_data_service.get_team_by_id')
    mock_get_team_by_id.return_value = {"id": 1, "name": "Lakers"}

    response = test_client.get('/teams/info/1')
    assert response.status_code == 200
    assert response.get_json() == {"id": 1, "name": "Lakers"}

def test_get_team_roster(test_client, mocker):
    mock_get_team_roster = mocker.patch('nba_app.routes.services.team_data_service.get_team_roster')
    mock_get_team_roster.return_value = pd.DataFrame([{"player_id": 1, "player_name": "LeBron James"}])

    response = test_client.get('/teams/roster/1/2023')
    assert response.status_code == 200
    assert response.get_json() == [{"player_id": 1, "player_name": "LeBron James"}]

    mock_get_team_roster.return_value = None

    response = test_client.get('/teams/roster/1/2023')
    assert response.status_code == 500
    assert response.get_json() == {'error': 'Could not fetch the team roster'}
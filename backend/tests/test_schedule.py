import pytest
from flask import Flask
from nba_app import create_app 
from nba_api.live.nba.endpoints import scoreboard

def test_fetch_live_scores(test_client, mocker):
    mock_scoreboard = mocker.patch('nba_api.live.nba.endpoints.scoreboard.ScoreBoard')
    mock_scoreboard.return_value.games.get_json.return_value = {'games': 'some live scores'}

    response = test_client.get('/schedule/live')
    assert response.status_code == 200
    assert response.get_json() == {'games': 'some live scores'}

def test_fetch_old_scores(test_client, mocker):
    mock_get_scoreboard_date = mocker.patch('nba_app.routes.services.games_data_service.get_scoreboard_date')
    mock_get_scoreboard_date.return_value = {'GameHeader': [{'game_id': '12345', 'scores': 'some old scores'}]}

    response = test_client.get('/schedule/2023-04-25')
    assert response.status_code == 200
    assert response.get_json() == {'GameHeader': [{'game_id': '12345', 'scores': 'some old scores'}]}
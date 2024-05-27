import pytest
from datetime import date
from nba_app import db 
from nba_app.models import PlayerBio, SynergyData, User, FavoritePlayers


def test_player_bio_model(init_database):
    player_bio = PlayerBio(
        player_id=1,
        first_name='LeBron',
        last_name='James',
        display_name='LeBron James',
        birthdate=date(1984, 12, 30),
        school='St. Vincent-St. Mary HS (OH)',
        height='6-9',
        weight='250',
        jersey='23',
        position='F',
        team_id=1610612739,
        team_abbreviation='CLE',
        from_year=2003,
        to_year=2021,
        draft_year='2003',
        draft_round='1',
        draft_number='1'
    )
    db.session.add(player_bio)
    db.session.commit()

    retrieved_player = PlayerBio.query.filter_by(player_id=1).first()
    assert retrieved_player.to_dict() == {
        "player_id": 1,
        "first_name": 'LeBron',
        "last_name": 'James',
        "display_name": 'LeBron James',
        "birthdate": '1984-12-30',
        "school": 'St. Vincent-St. Mary HS (OH)',
        "height": '6-9',
        "weight": '250',
        "jersey": '23',
        "position": 'F',
        "team_id": 1610612739,
        "team_abbreviation": 'CLE',
        "from_year": 2003,
        "to_year": 2021,
        "draft_year": '2003',
        "draft_round": '1',
        "draft_number": '1'
    }

def test_synergy_data_model(init_database):
    synergy_data = SynergyData(
        player_id=1,
        player_name='LeBron James',
        season_id='2021-22',
        team_id=1610612739,
        team_abbreviation='CLE',
        play_type='Transition',
        gp=55,
        ppp=1.12,
        poss=200,
        pts=224,
        fg_pct=0.512,
        efg_pct=0.558,
        frequency=0.2,
        score_frequency=0.65,
        percentile=95.0
    )
    db.session.add(synergy_data)
    db.session.commit()

    retrieved_data = SynergyData.query.filter_by(player_id=1).first()
    assert retrieved_data.to_dict() == {
        "player_id": 1,
        "player_name": 'LeBron James',
        "season_id": '2021-22',
        "team_id": 1610612739,
        "team_abbreviation": 'CLE',
        "play_type": 'Transition',
        "gp": 55,
        "ppp": 1.12,
        "poss": 200,
        "pts": 224,
        "fg_pct": 0.512,
        "efg_pct": 0.558,
        "frequency": 0.2,
        "score_frequency": 0.65,
        "percentile": 95.0
    }

def test_user_model(init_database):
    user = User(username='testuser', email='testuser@example.com')
    user.set_password('password')
    db.session.add(user)
    db.session.commit()

    retrieved_user = User.query.filter_by(username='testuser').first()
    assert retrieved_user is not None
    assert retrieved_user.check_password('password') == True

    # Test authentication
    authenticated_user = User.authenticate('testuser', 'password')
    assert authenticated_user is not None
    assert authenticated_user.username == 'testuser'

    # Test failed authentication
    authenticated_user = User.authenticate('testuser', 'wrongpassword')
    assert authenticated_user == False

def test_favorite_players_model(init_database):
    user = User(username='uniqueuser', email='uniqueuser@example.com')
    user.set_password('password')
    db.session.add(user)
    db.session.commit()

    favorite_player = FavoritePlayers(user_id=user.id, player_id='12345')
    db.session.add(favorite_player)
    db.session.commit()

    retrieved_user = User.query.get(user.id)
    assert retrieved_user.username == 'uniqueuser'
    assert retrieved_user.email == 'uniqueuser@example.com'
    assert retrieved_user.favorite_players[0].player_id == '12345'
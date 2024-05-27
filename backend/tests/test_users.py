import pytest
from flask_jwt_extended import create_access_token
from nba_app.models import User, FavoritePlayers, db
from sqlalchemy.exc import IntegrityError

def test_signup(test_client, mocker):
    mock_signup = mocker.patch('nba_app.models.User.signup')
    mock_signup.return_value = User(username='uniqueuser', email='uniqueuser@example.com')

    response = test_client.post('/users/signup', json={
        'username': 'uniqueuser',
        'password': 'password',
        'email': 'uniqueuser@example.com'
    })
    assert response.status_code == 200
    assert 'access_token' in response.get_json()

    # Test IntegrityError
    mock_signup.side_effect = IntegrityError('mock', 'params', 'orig')
    response = test_client.post('/users/signup', json={
        'username': 'uniqueuser2',
        'password': 'password',
        'email': 'uniqueuser2@example.com'
    })
    assert response.status_code == 400
    assert response.get_json() == {'message': 'Username already taken'}

def test_login(test_client, mocker):
    mock_authenticate = mocker.patch('nba_app.models.User.authenticate')
    mock_authenticate.return_value = User(username='testuser', email='testuser@example.com')

    response = test_client.post('/users/login', json={
        'username': 'testuser',
        'password': 'password'
    })
    assert response.status_code == 200
    assert 'access_token' in response.get_json()

    # Test invalid credentials
    mock_authenticate.side_effect = Exception('Invalid credentials')
    response = test_client.post('/users/login', json={
        'username': 'wronguser',
        'password': 'wrongpassword'
    })
    assert response.status_code == 401
    assert response.get_json() == {'message': 'Invalid credentials'}

def test_protected_route(test_client, init_database):
    access_token = create_access_token(identity='testuser')
    headers = {'Authorization': f'Bearer {access_token}'}

    response = test_client.get('/protected', headers=headers)
    assert response.status_code == 200
    assert response.get_json() == {'verified': 'testuser'}

def test_logout(test_client):
    access_token = create_access_token(identity='testuser')
    headers = {'Authorization': f'Bearer {access_token}'}

    response = test_client.post('/users/logout', headers=headers)
    assert response.status_code == 200
    assert response.get_json() == {'message': 'Logged out successfully'}

def test_show_userprofile(test_client, init_database):
    # Create a test user and add it to the database
    user = User(username='testuserprofile', email='testuserprofile@example.com')
    user.set_password('password')
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity='testuserprofile')
    headers = {'Authorization': f'Bearer {access_token}'}

    response = test_client.get('/users/profile/testuserprofile', headers=headers)
    assert response.status_code == 200
    profile = response.get_json()
    assert profile['username'] == 'testuserprofile'
    assert profile['email'] == 'testuserprofile@example.com'
    assert 'favorites' in profile

def test_add_favorite(test_client, init_database):
    # Create a test user and add it to the database
    user = User(username='testuserfavorite', email='testuserfavorite@example.com')
    user.set_password('password')
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity='testuserfavorite')
    headers = {'Authorization': f'Bearer {access_token}'}

    response = test_client.post('/users/favorites/add/1', headers=headers)
    assert response.status_code == 200
    assert response.get_json() == {'message': 'Added to favorites'}

def test_delete_favorite(test_client, init_database):
    # Create a test user and add it to the database
    user = User(username='testuserdeletefavorite', email='testuserdeletefavorite@example.com')
    user.set_password('password')
    db.session.add(user)
    db.session.commit()

    # Add a favorite player for the user
    favorite_player = FavoritePlayers(user_id=user.id, player_id='1')
    db.session.add(favorite_player)
    db.session.commit()

    access_token = create_access_token(identity='testuserdeletefavorite')
    headers = {'Authorization': f'Bearer {access_token}'}

    response = test_client.post('/users/favorites/delete/1', headers=headers)
    assert response.status_code == 200
    assert response.get_json() == {'message': 'Deleted from favorites'}

def test_delete_account(test_client, init_database):
    # Create a test user and add it to the database
    user = User(username='testuserdeleteaccount', email='testuserdeleteaccount@example.com')
    user.set_password('password')
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity='testuserdeleteaccount')
    headers = {'Authorization': f'Bearer {access_token}'}

    response = test_client.post('/users/account/delete', headers=headers)
    assert response.status_code == 200
    assert response.get_json() == {'message': 'Account deleted'}

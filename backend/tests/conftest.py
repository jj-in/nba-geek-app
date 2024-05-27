import pytest
from nba_app import create_app, db
from nba_app.models import User

@pytest.fixture(scope='module')
def test_client():
    app = create_app('config.TestingConfig')
    testing_client = app.test_client()

    # Establish an application context before running the tests
    ctx = app.app_context()
    ctx.push()

    yield testing_client

    ctx.pop()

@pytest.fixture(scope='module')
def init_database(test_client):
    with test_client.application.app_context():
        # Create the database and the database table
        db.create_all()

        # Insert user data
        user1 = User(username='testuser1', email='testuser1@example.com')
        user1.set_password('password')
        db.session.add(user1)

        user2 = User(username='testuser2', email='testuser2@example.com')
        user2.set_password('password')
        db.session.add(user2)

        # Commit the changes for the users
        db.session.commit()

        yield db
        
        # prevent unique constraint violations
        db.session.rollback()
        db.drop_all()

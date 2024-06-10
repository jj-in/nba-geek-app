### Specific backend instructions:
    Make sure to follow instructions to set up .env for environment variables which also includes flask environment variables (e.g FLASK_APP='nba_app')

## If locally using Python 3.8:
Feel free to delete the following files: `Procfile`, `wsgi.py`, and `run_sql.py`

# Command line instructions to create virtual environment and install requirements:
    `sudo apt-get update`
    `sudo apt-get install python3.8 python3.8-venv`
    `python3.8 -m venv venv`
    `source myenv/bin/activate`
    `pip install -r requirements.txt`

# Ensure you have PostgreSQL installed. You can check by running:
`
    ```sh
    psql --version
`

# To create new database via command line:
Open a terminal and enter the PostgreSQL command-line interface:
    `psql`
Create and name db:
`CREATE DATABASE nba_geek_db;`
Use your default or existing postgres user or optionally create new one:
[optional] `CREATE USER nba_geek_user WITH PASSWORD 'your_password';`
Grant all privileges on the new database to the new user:
[optional] `GRANT ALL PRIVILEGES ON DATABASE nba_geek_db TO nba_geek_user;`
Exit the PostgreSQL interface:
`\q`

[example] your database_location might then look like this:
`postgresql://postgres:password@localhost:5432/nba_geek_db` or 
`postgresql://nba_geek_user:your_password@localhost:5432/nba_geek_db`

## Place .env in this folder with format
`
DATABASE_URI=database_location
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_key
FLASK_APP='nba_app'
FLASK_ENV='development'
TEST_DATABASE_URI='sqlite:///:memory:'
`

# Run the following command to seed your database's synergy_data table (~11mb of stats data so be patient):
`
    ```sh
    psql -U your_username -d your_database -f path/to/synergy_data.sql
`
[example] `psql -U nba_geek_user -d nba_geek_db -f synergy_data.sql`


# Run flask
In command line: `flask run`

## If using python 3.12 for compatibility with heroku deployment:
Replace requirements.txt contents with:
`bcrypt==4.1.3
blinker==1.8.2
certifi==2023.11.17
charset-normalizer==3.3.2
click==8.1.7
Flask==3.0.3
Flask-Bcrypt==1.0.1
Flask-Cors==4.0.1
Flask-JWT-Extended==4.6.0
Flask-SQLAlchemy==3.1.1
greenlet==3.0.3
gunicorn==22.0.0
idna==3.7
iniconfig==2.0.0
itsdangerous==2.2.0
Jinja2==3.1.4
MarkupSafe==2.1.5
nba_api==1.4.1
numpy==1.26.4
packaging==24.0
pandas==2.2.2
pluggy==1.5.0
psycopg2-binary==2.9.9
PyJWT==2.8.0
pytest==8.2.1
pytest-flask==1.3.0
pytest-mock==3.14.0
python-dateutil==2.9.0.post0
python-dotenv==1.0.1
pytz==2024.1
requests==2.32.3
six==1.16.0
SQLAlchemy==2.0.30
typing_extensions==4.12.1
tzdata==2024.1
urllib3==2.2.1
Werkzeug==3.0.3
`

# Set environmental variables:
    Using heroku webpage project dashboard 'Config vals':
Make sure to set `FLASK_ENV` to `production`
Create a new config variable `DATABASE_URI` and use your heroku database url but replace initial `postgres` in address with `postgresql`

# Run wsgi.py to create database tables only for initial deployment:
    The file currently includes `db.create_all()` to setup db;
    If you take heroku offline, remove or comment out that section

# If facing CORS issues:
    Explicitly set CORS in app __init__ file:
`CORS(app, resources={r"/api/*": {
    "origins": FRONTEND_URL
    "allow_headers": [
        "Content-Type", 
        "Authorization", 
        "X-Requested-With"
    ],
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}})`

### Notes
I have included a file 'new_synergy_data.py' to run as a command line python script (or using Procfile/wsgi) to update Synergy Data after 2024-25 season starts since the current data is up to date through end of 2023-24 season.
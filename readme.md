# NBA Geek

NBA Geek is a web application that provides detailed statistics and information about NBA players, teams, games, and schedules. It is built mainly off of the python nba-api library (https://github.com/swar/nba_api). The main goal of the site is to allow users to access less traditional basketball stats data from various sources to present users with comprehensive insights into their favorite players and teams, historical and current game data, and live score updates.

Currently deployed at: https://nba-geek-23.surge.sh/

## Features

### Player Statistics and Information
- **Player Bio and Career Stats**: Users can search for NBA players and view detailed biographies, including career stats and historical performance.
- **Synergy Data**: Advanced metrics for players are available, including play types and performance analytics.

### Team Information
- **Active Teams**: Lists all active NBA teams.
- **Team Details**: Provides detailed information about specific teams, including rosters and season performance.
- **Team Roster**: Displays the current roster of a specified team for a given season.

### Game Data
- **Game Details**: Users can fetch detailed box scores for individual games.
- **Box Scores**: Provides traditional, advanced, hustle, and defensive stats for players and teams in specific games.

### Schedule and Scores
- **Live Scores**: Fetches and displays live game scores.
- **Historical Scores**: Allows users to view scores from past games by specifying a date.

## Technology Stack

- **Frontend**: React (deployed on Surge)
- **Backend**: Flask (deployed on Heroku)
- **Database**: SQLite for local development, PostgreSQL for production
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication
- **Testing**: Pytest for backend unit tests
- **Other Libraries**: SQLAlchemy for ORM, Flask-CORS for handling Cross-Origin Resource Sharing, Flask-Bcrypt for password hashing

## Setup and Installation

### Prerequisites
- Python 3.8.10
- Node.js and npm (for frontend)

## Backend Notes
# General concept
    The API is designed to be RESTful, providing a clean and easy-to-use with json responses that you could run independently of this version's react frontend.
# View readme file in backend folder for more specific instructions
    Ensure to create .env with your actual values for the config.py to find.
    Database setup includes a sql data file to load Synergy Tracking data for all players since stat tracking feature has existed (2016). The actual nba-api route for this data has very little flexibility, making it impossible to sort and compare the stats with any degree of customization without accumulating all of the data into a dataset first.

## Import Frontend Note
    If you want to install all of the dependencies as I used them, you will need to force installing the modules with '--legacy-peer-deps' or else Node will get upset about versions possibly being incompatible, but I have had no issues with this. The reason the app is constructed this way is just because of the nba-logos module which was the best way I found to flexibly insert team logos throughout the app. If you want to avoid forcing the installs, you could just skip the nba-logos module, in which case you would have to edit the imports in various react components. If you go that route, you could always just eliminate logos or create a local static folder with all of the logos download and import it that way.

## API Documentation
    ## Player Endpoints
        GET /players: Get player ID by full name
        GET /players/all: Get all players
        GET /players/active: Get all active players
        GET /players/bio/int:player_id: Get player bio
        GET /players/career_stats/int:player_id: Get player career stats
        GET /players/synergy: Get league synergy data
        GET /players/synergy/int:player_id: Get player synergy data
        GET /players/game_logs/int:player_id: Get player game logs
    ## Team Endpoints
        GET /teams/active: Get all active teams
        GET /teams/info/<team_id>: Get team by ID
        GET /teams/roster/<team_id>/<season>: Get team roster for a season
    ## Game Endpoints
        GET /games/<game_id>: Get game details
        GET /games/boxscore/traditional/<game_id>: Get traditional boxscore
        GET /games/boxscore/team_stats/<game_id>: Get team stats boxscore
        GET /games/boxscore/advanced_player/<game_id>: Get advanced player boxscore
        GET /games/boxscore/advanced_team/<game_id>: Get advanced team boxscore
        GET /games/boxscore/hustle/<game_id>: Get hustle stats boxscore
        GET /games/boxscore/defensive/<game_id>: Get defensive stats boxscore
        GET /games/boxscore/tracking/<game_id>: Get tracking stats boxscore
    ## Schedule Endpoints
        GET /schedule/live: Fetch live scores
        GET /schedule/<date>: Fetch scores for a specific date
    ## User Endpoints
        POST /users/signup: User signup
        POST /users/login: User login
        GET /protected: Protected route to verify user token
        POST /users/logout: User logout
        GET /users/profile/<username>: View user profile
        POST /users/favorites/add/<player_id>: Add favorite player
        POST /users/favorites/delete/<player_id>: Delete favorite player
        POST /users/account/delete: Delete user account
## User Flow
    Sign Up/Login: Users start by signing up or logging in to access personalized features.
    View Players: Users can search for players and view detailed stats and synergy data.
    View Teams: Users can browse active teams and view detailed team info, including rosters.
    Game Data: Users can view detailed game stats, including live scores and historical game data.
    User Profile: Users can manage their profile, including adding favorite players and viewing their   favorite list.

## Notes
    The API is designed to be RESTful, providing a clean and easy-to-use interface for accessing NBA data.
    Ensure to replace placeholders in .env and runtime.txt files with actual values before deployment.
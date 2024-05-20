# formatting our difficult game details return objects to make it easier for frontend, still could be improved

def format_future_game_details(game_data):
    game_summary = game_data['GameSummary'][0]
    line_scores = game_data['LineScore']
    last_meeting = game_data['LastMeeting'][0]
    
    # Calculate the formatted season
    start_year = int(game_summary['SEASON'])
    end_year_suffix = (start_year + 1) % 100 
    
    game_details = {
        "GameStatus": {
            "GAME_STATUS_TEXT": 'Scheduled'
        },
        "GameDetails": {
            "LEAGUE_ID": "00",
            "GAME_DATE_EST": game_summary['GAME_DATE_EST'][:10],
            "SEASON": f"{start_year}-{end_year_suffix:02d}",
            "GAME_ID": game_summary['GAME_ID'],
            "HOME_TEAM_ID": game_summary['HOME_TEAM_ID'],
            "VISITOR_TEAM_ID": game_summary['VISITOR_TEAM_ID'],
            "HOME_TRICODE": next(ls['TEAM_ABBREVIATION'] for ls in line_scores if ls['TEAM_ID'] == game_summary['HOME_TEAM_ID']),
            "HOME_CITY": next(ls['TEAM_CITY_NAME'] for ls in line_scores if ls['TEAM_ID'] == game_summary['HOME_TEAM_ID']),
            "HOME_NAME": next(ls['TEAM_NICKNAME'] for ls in line_scores if ls['TEAM_ID'] == game_summary['HOME_TEAM_ID']),
            "HOME_RECORD": next(ls['TEAM_WINS_LOSSES'] for ls in line_scores if ls['TEAM_ID'] == game_summary['HOME_TEAM_ID']),
            "AWAY_TRICODE": next(ls['TEAM_ABBREVIATION'] for ls in line_scores if ls['TEAM_ID'] == game_summary['VISITOR_TEAM_ID']),
            "AWAY_CITY": next(ls['TEAM_CITY_NAME'] for ls in line_scores if ls['TEAM_ID'] == game_summary['VISITOR_TEAM_ID']),
            "AWAY_NAME": next(ls['TEAM_NICKNAME'] for ls in line_scores if ls['TEAM_ID'] == game_summary['VISITOR_TEAM_ID']),
            "AWAY_RECORD": next(ls['TEAM_WINS_LOSSES'] for ls in line_scores if ls['TEAM_ID'] == game_summary['VISITOR_TEAM_ID']),
            "GAME_DATE": game_data['GameInfo'][0]['GAME_DATE']
        },
        "LastMeeting": {
            "GAME_ID": last_meeting['LAST_GAME_ID'],
            "GAME_DATE": last_meeting['LAST_GAME_DATE_EST'][:10],
            "HOME_ID": last_meeting['LAST_GAME_HOME_TEAM_ID'],
            "HOME_TRICODE": last_meeting['LAST_GAME_HOME_TEAM_ABBREVIATION'],
            "HOME_POINTS": last_meeting['LAST_GAME_HOME_TEAM_POINTS'],
            "AWAY_ID": last_meeting['LAST_GAME_VISITOR_TEAM_ID'],
            "AWAY_TRICODE": last_meeting['LAST_GAME_VISITOR_TEAM_CITY1'],
            "AWAY_POINTS": last_meeting['LAST_GAME_VISITOR_TEAM_POINTS']
        }
    }  
    return game_details

def format_completed_game_details(game_data):
    transformed_data = {
        "GameStatus": {"GAME_STATUS_TEXT": game_data["GameSummary"][0]["GAME_STATUS_TEXT"]},
        "GameDetails": [],
        "TeamScores": [],
        "TeamStats": [],
        "Officials": [],
        "InactivePlayers": {},
        "LastMeeting": {}
    }
    game_summary = game_data["GameSummary"][0]
    game_info = game_data["GameInfo"][0]
    line_scores = {team["TEAM_ID"]: team for team in game_data["LineScore"]}
    other_stats = {team["TEAM_ID"]: team for team in game_data["OtherStats"]}
    last_meeting = game_data["LastMeeting"][0]

    transformed_data["GameDetails"].append({
        "GAME_DATE": game_summary["GAME_DATE_EST"][:10],
        "SEASON": game_summary["SEASON"] + "-24",
        "GAME_ID": game_summary["GAME_ID"],
        "HOME_TEAM_ID": game_summary["HOME_TEAM_ID"],
        "AWAY_TEAM_ID": game_summary["VISITOR_TEAM_ID"],
        "FINAL_PERIOD": game_summary["LIVE_PERIOD"],
        "HOME_TRICODE": line_scores[game_summary["HOME_TEAM_ID"]]["TEAM_ABBREVIATION"],
        "HOME_CITY": line_scores[game_summary["HOME_TEAM_ID"]]["TEAM_CITY_NAME"],
        "HOME_NAME": line_scores[game_summary["HOME_TEAM_ID"]]["TEAM_NICKNAME"],
        "HOME_RECORD": line_scores[game_summary["HOME_TEAM_ID"]]["TEAM_WINS_LOSSES"],
        "HOME_SCORE": line_scores[game_summary["HOME_TEAM_ID"]]["PTS"],
        "AWAY_TRICODE": line_scores[game_summary["VISITOR_TEAM_ID"]]["TEAM_ABBREVIATION"],
        "AWAY_CITY": line_scores[game_summary["VISITOR_TEAM_ID"]]["TEAM_CITY_NAME"],
        "AWAY_NAME": line_scores[game_summary["VISITOR_TEAM_ID"]]["TEAM_NICKNAME"],
        "AWAY_RECORD": line_scores[game_summary["VISITOR_TEAM_ID"]]["TEAM_WINS_LOSSES"],
        "AWAY_SCORE": line_scores[game_summary["VISITOR_TEAM_ID"]]["PTS"],
        "GAME_DAY_AND_DATE": game_info["GAME_DATE"],
        "ATTENDANCE": game_info["ATTENDANCE"],
        "GAME_TIME": game_info["GAME_TIME"],
    })

    for team_id, team_stats in line_scores.items():
        transformed_data["TeamScores"].append({
            team_stats["TEAM_ABBREVIATION"]: {
                "PTS_QTR1": team_stats["PTS_QTR1"],
                "PTS_QTR2": team_stats["PTS_QTR2"],
                "PTS_QTR3": team_stats["PTS_QTR3"],
                "PTS_QTR4": team_stats["PTS_QTR4"],
                "PTS_OT1": team_stats["PTS_OT1"],
                "PTS_OT2": team_stats["PTS_OT2"],
                "PTS_OT3": team_stats["PTS_OT3"],
                "PTS_OT4": team_stats["PTS_OT4"],
                "PTS_OT5": team_stats["PTS_OT5"],
                "PTS_OT6": team_stats["PTS_OT6"],
                "PTS_OT7": team_stats["PTS_OT7"],
                "PTS_OT8": team_stats["PTS_OT8"],
                "PTS_OT9": team_stats["PTS_OT9"],
                "PTS_OT10": team_stats["PTS_OT10"],
                "PTS": team_stats["PTS"]
            }
        })

    for team_id, team_stats in other_stats.items():
        transformed_data["TeamScores"].append({
            team_stats["TEAM_ABBREVIATION"]: {
                "PTS_PAINT": team_stats["PTS_PAINT"],
                "PTS_2ND_CHANCE": team_stats["PTS_2ND_CHANCE"],
                "PTS_FB": team_stats["PTS_FB"],
                "LARGEST_LEAD": team_stats["LARGEST_LEAD"],
                "LEAD_CHANGES": team_stats["LEAD_CHANGES"],
                "TIMES_TIED": team_stats["TIMES_TIED"],
                "TEAM_TURNOVERS": team_stats["TEAM_TURNOVERS"],
                "TOTAL_TURNOVERS": team_stats["TOTAL_TURNOVERS"],
                "TEAM_REBOUNDS": team_stats["TEAM_REBOUNDS"],
                "PTS_OFF_TO": team_stats["PTS_OFF_TO"],
                }
        })
    
    for official in game_data["Officials"]:
        transformed_data["Officials"].append({
            "OFFICIAL_ID": official["OFFICIAL_ID"],
            "FIRST_NAME": official["FIRST_NAME"],
            "LAST_NAME": official["LAST_NAME"],
        })

    for player in game_data["InactivePlayers"]:
        team_code = player["TEAM_ABBREVIATION"]
        if team_code not in transformed_data["InactivePlayers"]:
            transformed_data["InactivePlayers"][team_code] = []
        
        transformed_data["InactivePlayers"][team_code].append({
                "PLAYER_ID": player["PLAYER_ID"],
                "FIRST_NAME": player["FIRST_NAME"],
                "LAST_NAME": player["LAST_NAME"],
        })
        
    if last_meeting:
        transformed_data["LastMeeting"] = {
            "GAME_ID": last_meeting["LAST_GAME_ID"],
            "GAME_DATE": last_meeting["LAST_GAME_DATE_EST"],
            "HOME_ID": last_meeting["LAST_GAME_HOME_TEAM_ID"],
            "HOME_TRICODE": last_meeting["LAST_GAME_HOME_TEAM_ABBREVIATION"],
            "AWAY_ID": last_meeting["LAST_GAME_VISITOR_TEAM_ID"],
            "AWAY_TRICODE": last_meeting["LAST_GAME_VISITOR_TEAM_CITY1"],
            "HOME_POINTS": last_meeting["LAST_GAME_HOME_TEAM_POINTS"],
            "AWAY_POINTS": last_meeting["LAST_GAME_VISITOR_TEAM_POINTS"],
        }

    return transformed_data

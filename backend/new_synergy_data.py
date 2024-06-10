import pandas as pd
from nba_api.stats.endpoints import synergyplaytypes


"""This file is only needed after the 2024-25 NBA season is underway"""
seasons = ['2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24']
play_types = ['Cut', 'Handoff', 'Isolation', 'Misc', 'OffScreen', 'Postup', 'PRBallHandler', 'PRRollman', 'OffRebound', 'Spotup', 'Transition']

def fetch_and_convert_play_type_data_to_sql(output_file='synergy_data.sql'):
    with open(output_file, 'w') as sql_file:
        sql_file.write("INSERT INTO synergy_data VALUES\n")
        value_lines = []

        for season in seasons:
            for play_type in play_types:
                print(f"Fetching data for Season: {season}, Play Type: {play_type}")
                try:
                    response = synergyplaytypes.SynergyPlayTypes(
                        league_id='00',
                        season=season,
                        season_type_all_star='Regular Season',
                        per_mode_simple='Totals',
                        player_or_team_abbreviation='P',
                        play_type_nullable=play_type,
                        type_grouping_nullable='offensive'
                    )
                    data_frame = response.get_data_frames()[0]
                    
                    # Ensure we are only capturing necessary columns and renaming correctly
                    data_frame = data_frame[['PLAYER_ID', 'PLAYER_NAME', 'TEAM_ID', 'TEAM_ABBREVIATION', 'GP', 'PPP', 'POSS', 'PTS', 'FG_PCT', 'EFG_PCT', 'POSS_PCT', 'SCORE_POSS_PCT', 'PERCENTILE']]
                    data_frame.rename(columns={'POSS_PCT': 'FREQUENCY', 'SCORE_POSS_PCT': 'SCORE_FREQUENCY'}, inplace=True)
                    data_frame['SEASON_ID'] = season
                    data_frame['PLAY_TYPE'] = play_type

                    # Iterate through DataFrame rows and format as SQL insert values
                    for index, row in data_frame.iterrows():
                        value_line = f"({index+1}, {row['PLAYER_ID']}, '{row['PLAYER_NAME'].replace("'", "''")}', '{row['SEASON_ID']}', {row['TEAM_ID']}, '{row['TEAM_ABBREVIATION']}', '{row['PLAY_TYPE']}', {row['GP']}, {row['PPP']}, {row['POSS']}, {row['PTS']}, {row['FG_PCT']}, {row['EFG_PCT']}, {row['FREQUENCY']}, {row['SCORE_FREQUENCY']}, {row['PERCENTILE']})"
                        value_lines.append(value_line)
                    
                except Exception as e:
                    print(f"An error occurred: {e}")
        
        sql_file.write(",\n".join(value_lines))
        sql_file.write(";\n")

fetch_and_convert_play_type_data_to_sql()
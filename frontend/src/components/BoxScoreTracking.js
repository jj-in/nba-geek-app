import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

// reactstrap Table fits page well, styling beyond stripe feels unnecessary for now

const BoxScoreTracking = ({ data }) => {
  if (data.message) return <div>No Tracking Data Available</div>;

  const renderPlayerRow = (player) => (
    <tr key={player.personId}>
      <td><Link to={`/player/${player.personId}`}>{`${player.firstName} ${player.familyName}`}</Link></td>
      <td>{player.minutes}</td>
      <td>{player.distance.toFixed(2)} mi</td>
      <td>{player.reboundChancesOffensive}</td>
      <td>{player.reboundChancesDefensive}</td>
      <td>{player.reboundChancesTotal}</td>
      <td>{player.touches}</td>
      <td>{player.secondaryAssists}</td>
      <td>{player.freeThrowAssists}</td>
      <td>{player.passes}</td>
      <td>{player.assists}</td>
      <td>{player.contestedFieldGoalsMade}</td>
      <td>{player.contestedFieldGoalsAttempted}</td>
      <td>{(player.contestedFieldGoalPercentage * 100).toFixed(1)}%</td>
      <td>{player.uncontestedFieldGoalsMade}</td>
      <td>{player.uncontestedFieldGoalsAttempted}</td>
      <td>{(player.uncontestedFieldGoalsPercentage * 100).toFixed(1)}%</td>
      <td>{(player.fieldGoalPercentage * 100).toFixed(1)}%</td>
      <td>{player.defendedAtRimFieldGoalsMade}</td>
      <td>{player.defendedAtRimFieldGoalsAttempted}</td>
      <td>{(player.defendedAtRimFieldGoalPercentage * 100).toFixed(1)}%</td>
    </tr>
  );

  return (
    <div>
      <h1>Player On-Court Tracking Data</h1>
      {Object.entries(data).map(([teamId, players], index) => (
        <div key={index} className="team-tracking-stats">
          <h2>{players[0].teamCity} {players[0].teamName}</h2>
          <Table striped>
            <thead>
              <tr>
                <th>Player</th>
                <th>Min</th>
                <th>Distance</th>
                <th>Off. Reb. Chances</th>
                <th>Def. Reb. Chances</th>
                <th>Total Reb. Chances</th>
                <th>Touches</th>
                <th>2nd Assists</th>
                <th>FT Assists</th>
                <th>Passes</th>
                <th>Assists</th>
                <th>Contested FGM</th>
                <th>Contested FGA</th>
                <th>Contested FG%</th>
                <th>Uncontested FGM</th>
                <th>Uncontested FGA</th>
                <th>Uncontested FG%</th>
                <th>FG%</th>
                <th>Def. At Rim FGM</th>
                <th>Def. At Rim FGA</th>
                <th>Def. At Rim FG%</th>
              </tr>
            </thead>
            <tbody>
              {players.map(renderPlayerRow)}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default BoxScoreTracking;
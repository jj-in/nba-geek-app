import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

// reactstrap Table fits page well, styling beyond stripe feels unnecessary for now

const BoxScoreAdvancedPlayer = ({ data }) => {
    if (data.message) return <div>No Advanced Stats Available For This Game</div>;

  const renderPlayerRow = (player) => {
    if (player.possessions !== 0) {
        return (
            <tr key={player.personId}>
                <td><Link to={`/player/${player.personId}`}>{player.firstName} {player.familyName}</Link></td>
                <td>{player.minutes}</td>
                <td>{player.possessions}</td>
                <td>{player.offensiveRating}</td>
                <td>{player.defensiveRating}</td>
                <td>{player.netRating}</td>
                <td>{player.usagePercentage}</td>
                <td>{player.effectiveFieldGoalPercentage}</td>
                <td>{player.trueShootingPercentage}</td>
                <td>{player.assistPercentage}</td>
                <td>{player.reboundPercentage}</td>
                <td>{player.offensiveReboundPercentage}</td>
            </tr>
        );
    } else {
        return (
            <tr key={player.personId}>
                <td><Link to={`/player/${player.personId}`}>{player.firstName} {player.familyName}</Link></td>
                <td colSpan="14">{player.comment || 'No data available'}</td>
            </tr>
        );
    }
};

return (
    <div>
        <h1>Advanced Box Score</h1>
        {Object.entries(data).map(([teamId, players], index) => (
        <div key={index} className="team-advanced-stats">
          <h2>{players[0].teamCity} {players[0].teamName}</h2>
          <Table striped>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Minutes</th>
                            <th>Possessions</th>
                            <th>O-Rating</th>
                            <th>D-Rating</th>
                            <th>Net Rating</th>
                            <th>Usage%</th>
                            <th>EFG%</th>
                            <th>TS%</th>
                            <th>AST%</th>
                            <th>REB%</th>
                            <th>O-REB%</th>
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
  
export default BoxScoreAdvancedPlayer;
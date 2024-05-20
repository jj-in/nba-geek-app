import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import ScoreTable from './ScoreTable'

// reactstrap Table fits page well, styling beyond stripe feels unnecessary for now
// score table component displays quarter by quarter team scores along with final scores (above player stats)

const BoxScoreTraditional = ({ data, lineScore }) => {
  if (!data) return <div>No Data Available</div>;

  const renderPlayerRow = (player) => {
    if (player.MIN !== null) {
        return (
            <tr key={player.PLAYER_ID}>
                <td><Link to={`/player/${player.PLAYER_ID}`}>{player.PLAYER_NAME}</Link></td>
                <td>{parseFloat(player.MIN)}</td>
                <td>{`${player.FGM}-${player.FGA}`}</td>
                <td>{`${player.FG3M}-${player.FG3A}`}</td>
                <td>{`${player.FTM}-${player.FTA}`}</td>
                <td>{player.OREB}</td>
                <td>{player.DREB}</td>
                <td>{player.REB}</td>
                <td>{player.AST}</td>
                <td>{player.STL}</td>
                <td>{player.BLK}</td>
                <td>{player.TO}</td>
                <td>{player.PF}</td>
                <td>{player.PTS}</td>
                <td>{player.PLUS_MINUS}</td>
                </tr>
        );
    } else {
        return (
            <tr key={player.PLAYER_ID}>
            <td><Link to={`/player/${player.PLAYER_ID}`}>{player.PLAYER_NAME}</Link></td>
            <td colSpan="14">{player.COMMENT || 'No data available'}</td>
            </tr>
        );
    }
};

return (
    <div>
        <ScoreTable teamScores={lineScore} />
        {Object.entries(data).map(([teamId, players], index) => (
        <div key={index} className="team-advanced-stats">
          <h2>{players[0].teamCity} {players[0].teamName}</h2>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>MIN</th>
                            <th>FG</th>
                            <th>3PT</th>
                            <th>FT</th>
                            <th>OREB</th>
                            <th>DREB</th>
                            <th>REB</th>
                            <th>AST</th>
                            <th>STL</th>
                            <th>BLK</th>
                            <th>TO</th>
                            <th>PF</th>
                            <th>PTS</th>
                            <th>+/-</th>
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


export default BoxScoreTraditional;
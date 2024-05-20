import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

// reactstrap Table fits page well, styling beyond stripe feels unnecessary for now

const BoxScoreDefense = ({ data }) => {
    if (!data) return <div>No Data Available</div>;

    const renderPlayerRow = (player) => (
        <tr key={player.personId}>
            <td><Link to={`/player/${player.personId}`}>{`${player.firstName} ${player.familyName}`}</Link></td>
            <td>{player.matchupMinutes}</td>
            <td>{player.partialPossessions.toFixed(1)}</td>
            <td>{player.playerPoints}</td>
            <td>{`${player.matchupAssists}`}</td>
            <td>{`${player.matchupTurnovers}`}</td>
            <td>{`${player.matchupFieldGoalsMade}`}</td>
            <td>{`${player.matchupFieldGoalsAttempted}`}</td>
            <td>{`(${(player.matchupFieldGoalPercentage * 100).toFixed(1)}%)`}</td>
            <td>{`${player.matchupThreePointersMade}`}</td>
            <td>{`${player.matchupThreePointersAttempted}`}</td>
            <td>{`(${(player.matchupThreePointerPercentage * 100).toFixed(1)}%)`}</td>
        </tr>
    );

    return (
        <div>
            <h1>Opponent Matchup Stats</h1>
            {Object.entries(data).map(([teamCity, players], index) => (
                <div key={index} className="team-stats">
                    <h2>{teamCity}</h2>
                    <Table striped>  {/* Using Table from Reactstrap */}
                        <thead>
                            <tr>
                                <th>Defending Player</th>
                                <th>Minutes</th>
                                <th>Possessions</th>
                                <th>Points</th>
                                <th>Assists</th>
                                <th>Turnovers</th>
                                <th>FG</th>
                                <th>FGA</th>
                                <th>FG%</th>
                                <th>3P</th>
                                <th>3PA</th>
                                <th>3P%</th>
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

export default BoxScoreDefense;

import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

const BoxScoreHustle = ({ data }) => {
  if (!data) return <div>No Data Available</div>;

  const renderPlayerRow = (player) => (
    <tr key={player.personId}>
      <td><Link to={`/player/${player.personId}`}>{player.firstName} {player.familyName}</Link></td>
      <td>{player.contestedShots}</td>
      <td>{player.contestedShots2pt}</td>
      <td>{player.contestedShots3pt}</td>
      <td>{player.deflections}</td>
      <td>{player.chargesDrawn}</td>
      <td>{player.screenAssists}</td>
      <td>{player.screenAssistPoints}</td>
      <td>{player.looseBallsRecoveredOffensive}</td>
      <td>{player.looseBallsRecoveredDefensive}</td>
      <td>{player.looseBallsRecoveredTotal}</td>
      <td>{player.offensiveBoxOuts}</td>
      <td>{player.defensiveBoxOuts}</td>
      <td>{player.boxOutPlayerTeamRebounds}</td>
      <td>{player.boxOutPlayerRebounds}</td>
      <td>{player.boxOuts}</td>
    </tr>
  );

  return (
    <div>
      <h1>Hustle Stats Box Score</h1>
      {Object.entries(data).map(([teamCity, players], index) => (
        <div key={index} className="team-stats">
          <h2>{teamCity}</h2>
          <Table striped>
            <thead>
              <tr>
                <th>Player</th>
                <th>C. Shots</th>
                <th>C. Shots 2PT</th>
                <th>C. Shots 3PT</th>
                <th>Deflections</th>
                <th>Charges Drawn</th>
                <th>Screen Assists</th>
                <th>Screen Assist Points</th>
                <th>Loose Balls Off.</th>
                <th>Loose Balls Def.</th>
                <th>Loose Balls Total</th>
                <th>Off. Box Outs</th>
                <th>Def. Box Outs</th>
                <th>Team Rebounds (BO)</th>
                <th>Player Rebounds (BO)</th>
                <th>Box Outs</th>
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

export default BoxScoreHustle;

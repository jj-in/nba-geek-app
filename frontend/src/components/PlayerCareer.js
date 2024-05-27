import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { Table } from 'reactstrap';

const PlayerCareer = () => {
  const { playerData } = usePlayer();
  if (!playerData || !playerData.careerData || !playerData.careerData["SeasonTotalsRegularSeason"]) {
    return <div>Loading career stats...</div>;
  }

  const careerStats = playerData.careerData["SeasonTotalsRegularSeason"];

  return (
    <div>
      <h2>Career Stats</h2>
      <Table bordered hover>
        <thead className="thead-light">
          <tr>
            <th>Season</th>
            <th>GP</th>
            <th>GS</th>
            <th>MIN</th>
            <th>FGM</th>
            <th>FGA</th>
            <th>FG%</th>
            <th>3PM</th>
            <th>3PA</th>
            <th>3P%</th>
            <th>FTM</th>
            <th>FTA</th>
            <th>FT%</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TOV</th>
            <th>PF</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {careerStats && careerStats.map((season, index) => (
            <tr key={index}>
              <td>{season.SEASON_ID}</td>
              <td>{season.GP}</td>
              <td>{season.GS}</td>
              <td>{season.MIN}</td>
              <td>{season.FGM}</td>
              <td>{season.FGA}</td>
              <td>{(season.FG_PCT * 100).toFixed(1)}%</td>
              <td>{season.FG3M}</td>
              <td>{season.FG3A}</td>
              <td>{(season.FG3_PCT * 100).toFixed(1)}%</td>
              <td>{season.FTM}</td>
              <td>{season.FTA}</td>
              <td>{(season.FT_PCT * 100).toFixed(1)}%</td>
              <td>{season.REB}</td>
              <td>{season.AST}</td>
              <td>{season.STL}</td>
              <td>{season.BLK}</td>
              <td>{season.TOV}</td>
              <td>{season.PF}</td>
              <td>{season.PTS}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PlayerCareer;

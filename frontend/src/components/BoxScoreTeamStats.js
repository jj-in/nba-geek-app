import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// experimenting with style-components library to organize and align our small team stats table

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  text-align: center;

  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const renderTeamStats = (team) => {
  return (
    <tr key={team.TEAM_ID}>
      <td>
        <Link to={`/team/${team.TEAM_ID}`}>
          {team.TEAM_CITY} {team.TEAM_NAME}
        </Link>
      </td>
      <td>{team.PTS}</td>
      <td>{`${team.FGM}-${team.FGA}`}</td>
      <td>{`${(team.FG_PCT * 100).toFixed(1)}%`}</td>
      <td>{`${team.FG3M}-${team.FG3A}`}</td>
      <td>{`${(team.FG3_PCT * 100).toFixed(1)}%`}</td>
      <td>{`${team.FTM}-${team.FTA}`}</td>
      <td>{`${(team.FT_PCT * 100).toFixed(1)}%`}</td>
      <td>{team.OREB}</td>
      <td>{team.DREB}</td>
      <td>{team.REB}</td>
      <td>{team.AST}</td>
      <td>{team.STL}</td>
      <td>{team.BLK}</td>
      <td>{team.TO}</td>
      <td>{team.PF}</td>
    </tr>
  );
};

const BoxScoreTeamStats = ({ data }) => {
  if (!data) return <div>No Data Available</div>;

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Team</th>
            <th>PTS</th>
            <th>FG</th>
            <th>FG%</th>
            <th>3PT</th>
            <th>3PT%</th>
            <th>FT</th>
            <th>FT%</th>
            <th>OREB</th>
            <th>DREB</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TO</th>
            <th>PF</th>
          </tr>
        </thead>
        <tbody>
          {renderTeamStats(data[0])}
          {renderTeamStats(data[1])}
        </tbody>
      </Table>
    </Container>
  );
};

export default BoxScoreTeamStats;
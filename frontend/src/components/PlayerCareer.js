import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import styled from 'styled-components';

// experimenting with styled components library. Headers 'pop' more than react strap. Player page should be more appealing than box score

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledHeader = styled.thead`
  background-color: #f8f9fa;
`;

const StyledRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f2f2f2;
  }
`;

const StyledCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
`;

const StyledHeaderCell = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  background-color: #007bff;
  color: white;
`;

const PlayerCareer = () => {
  const { playerData } = usePlayer();
  if (!playerData || !playerData.careerData || !playerData.careerData["SeasonTotalsRegularSeason"]) {
    return <div>Loading career stats...</div>;
  }

  // this fetches our year-by-year typical career stats page, but we have options to have alternative selections like postseason
  const careerStats = playerData.careerData["SeasonTotalsRegularSeason"];

  return (
    <div>
      <h2>Career Stats</h2>
      <StyledTable>
        <StyledHeader>
          <tr>
            <StyledHeaderCell>Season</StyledHeaderCell>
            <StyledHeaderCell>GP</StyledHeaderCell>
            <StyledHeaderCell>GS</StyledHeaderCell>
            <StyledHeaderCell>MIN</StyledHeaderCell>
            <StyledHeaderCell>FGM</StyledHeaderCell>
            <StyledHeaderCell>FGA</StyledHeaderCell>
            <StyledHeaderCell>FG%</StyledHeaderCell>
            <StyledHeaderCell>3PM</StyledHeaderCell>
            <StyledHeaderCell>3PA</StyledHeaderCell>
            <StyledHeaderCell>3P%</StyledHeaderCell>
            <StyledHeaderCell>FTM</StyledHeaderCell>
            <StyledHeaderCell>FTA</StyledHeaderCell>
            <StyledHeaderCell>FT%</StyledHeaderCell>
            <StyledHeaderCell>REB</StyledHeaderCell>
            <StyledHeaderCell>AST</StyledHeaderCell>
            <StyledHeaderCell>STL</StyledHeaderCell>
            <StyledHeaderCell>BLK</StyledHeaderCell>
            <StyledHeaderCell>TOV</StyledHeaderCell>
            <StyledHeaderCell>PF</StyledHeaderCell>
            <StyledHeaderCell>PTS</StyledHeaderCell>
          </tr>
        </StyledHeader>
        <tbody>
          {careerStats && careerStats.map((season, index) => (
            <StyledRow key={index}>
              <StyledCell>{season.SEASON_ID}</StyledCell>
              <StyledCell>{season.GP}</StyledCell>
              <StyledCell>{season.GS}</StyledCell>
              <StyledCell>{season.MIN}</StyledCell>
              <StyledCell>{season.FGM}</StyledCell>
              <StyledCell>{season.FGA}</StyledCell>
              <StyledCell>{(season.FG_PCT * 100).toFixed(1)}%</StyledCell>
              <StyledCell>{season.FG3M}</StyledCell>
              <StyledCell>{season.FG3A}</StyledCell>
              <StyledCell>{(season.FG3_PCT * 100).toFixed(1)}%</StyledCell>
              <StyledCell>{season.FTM}</StyledCell>
              <StyledCell>{season.FTA}</StyledCell>
              <StyledCell>{(season.FT_PCT * 100).toFixed(1)}%</StyledCell>
              <StyledCell>{season.REB}</StyledCell>
              <StyledCell>{season.AST}</StyledCell>
              <StyledCell>{season.STL}</StyledCell>
              <StyledCell>{season.BLK}</StyledCell>
              <StyledCell>{season.TOV}</StyledCell>
              <StyledCell>{season.PF}</StyledCell>
              <StyledCell>{season.PTS}</StyledCell>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default PlayerCareer;


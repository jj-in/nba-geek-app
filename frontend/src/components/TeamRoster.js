import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MyApi from '../utils/MyApi';
import TeamLogo from './TeamLogo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const TeamInfo = styled.p`
  text-align: center;
  margin: 5px;
  padding: 5px;
`;

const SeasonBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const SeasonText = styled.span`
  margin: 0 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: blue;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

const TeamRoster = () => {
  const { teamId } = useParams();
  const [error, setError] = useState('');
  const [team, setTeam] = useState([]);
  const [roster, setRoster] = useState([]);
  const [season, setSeason] = useState('2023-24');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const rosterResponse = await MyApi.fetchRoster(teamId, season);
        const teamResponse = await MyApi.fetchTeamInfo(teamId);
        setRoster(rosterResponse);
        setTeam(teamResponse);
      } catch (error) {
        setError('Failed to fetch roster');
        console.error('Error fetching team roster:', error);
      }
    };
    fetchTeam();
  }, [teamId, season]);

  const handlePrevSeason = async () => {
    const prevYear = parseInt(season.split('-')[0], 10) - 1;
    const prevSeason = `${prevYear}-${String(prevYear+1).slice(-2)}`;
    const checkSeason = await MyApi.fetchRoster(teamId, prevSeason);
    checkSeason.length > 0 && setSeason(prevSeason);
  };

  const handleNextSeason = async () => {
    const nextYear = parseInt(season.split('-')[0], 10) + 1;
    const nextSeason = `${nextYear}-${String(nextYear+1).slice(-2)}`;
    const checkSeason = await MyApi.fetchRoster(teamId, nextSeason);
    checkSeason.length > 0 && setSeason(nextSeason);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <TopContainer>
        <TeamInfo>
          {team.abbreviation && (
            <TeamLogo teamTricode={team.abbreviation.toUpperCase()} size={30} />
          )}
          {team.full_name} Roster
        </TeamInfo>
        <SeasonBox>
          <Button onClick={handlePrevSeason}>
            Previous
          </Button>
          <SeasonText>{season}</SeasonText>
          <Button onClick={handleNextSeason} disabled={season === '2023-24'}>Next</Button>
        </SeasonBox>
      </TopContainer>
      <Table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Number</th>
            <th>Position</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {roster.map((player) => (
            <tr key={player.PLAYER_ID}>
              <td>
                <a href={`/player/${player.PLAYER_ID}`}>{player.PLAYER}</a>
              </td>
              <td>{player.NUM}</td>
              <td>{player.POSITION}</td>
              <td>{player.HEIGHT}</td>
              <td>{player.WEIGHT}</td>
              <td>{player.AGE}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TeamRoster;
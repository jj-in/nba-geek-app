import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Table } from 'reactstrap';
import MyApi from '../utils/MyApi';
import TeamLogo from './TeamLogo';

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-center">
          {team.abbreviation && (
            <TeamLogo teamTricode={team.abbreviation.toUpperCase()} size={30} />
          )}
          <p>{team.full_name} Roster</p>
        </div>
        <div className="d-flex align-items-center">
          <Button color="primary" onClick={handlePrevSeason}>
            Previous
          </Button>
          <span className="mx-2">{season}</span>
          <Button color="primary" onClick={handleNextSeason} disabled={season === '2023-24'}>
            Next
          </Button>
        </div>
      </div>
      <Table bordered hover>
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

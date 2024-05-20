import React, { useState, useEffect } from 'react';
import MyApi from '../utils/MyApi';
import { Link } from 'react-router-dom';
import TeamLogo from './TeamLogo';

const Scoreboard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await MyApi.fetchLiveScores();
        setGames(response);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch live scores:', error);
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return <div>Loading scores...</div>;
  }

  return (
    <div>
      <h2>Today's Scores</h2>
      {games.map((game) => (
        <div key={game.gameId} style={{ width: '500px', margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>
          <TeamLogo teamTricode={game.homeTeam.teamTricode} size={50} /><Link to={`/game/${game.gameId}`}>{game.homeTeam.teamTricode} vs {game.awayTeam.teamTricode}</Link><TeamLogo teamTricode={game.awayTeam.teamTricode} size={50} />
          </h3>
          <p>Status: {game.gameStatusText}</p>
          {game.gameStatus === 1 && (
            <p>Start Time: {new Date(game.gameTimeUTC).toLocaleTimeString()}</p>
          )}
          {game.gameStatus === 2 && (
            <p>Q{game.period} - {game.gameClock || 'End of Quarter'}</p>
          )}
          {(game.gameStatus === 2 || game.gameStatus === 3) && (
            <p>Score: {game.homeTeam.teamTricode} {game.homeTeam.score} - {game.awayTeam.teamTricode} {game.awayTeam.score}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;
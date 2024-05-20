import React, { useState, useEffect }  from 'react';
import { useParams, Link } from 'react-router-dom';
import MyApi from '../utils/MyApi'; 
import './GameDetails.css';

// utilizing our game summary fetch object for basic game details but we have more data to explore. The JSON object is clunky though
// css has minimal function for now, but in place to add more design
// main function of this component is to give final score, game date and link to box score page

const GameDetails = () => {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      setLoading(true);
      try {
        const data = await MyApi.fetchGameSummary(gameId);
        setGameDetails(data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [gameId]);

  if (loading) {
    return <div>Loading game details...</div>;
  }

  if (!gameDetails) {
    return <div>No game details available.</div>;
  }

  return (
    <div className="main-container">
      {gameDetails.GameStatus.GAME_STATUS_TEXT === "Final" ? (
        <>
          <div style={{ textAlign: 'center' }}>
            <h2>{gameDetails.GameDetails[0].HOME_NAME} vs {gameDetails.GameDetails[0].AWAY_NAME}</h2>
            <h4>{gameDetails.GameDetails[0].GAME_DAY_AND_DATE}</h4>
            <h4>Final Score</h4>
            <h2>{gameDetails.GameDetails[0].HOME_SCORE} - {gameDetails.GameDetails[0].AWAY_SCORE}</h2>
          </div>
          <h2><Link to={`/game/boxscore/${gameDetails.GameDetails[0].GAME_ID}`}>Box Score</Link></h2>
        </>
      ) : (
        <>
          <div style={{ textAlign: 'center' }}>
            <h2>{gameDetails.GameDetails.HOME_NAME} vs {gameDetails.GameDetails.AWAY_NAME}</h2>
          </div>
          <h2>{gameDetails.GameDetails.GAME_DATE}</h2>
        </>
      )}
    </div>
  );
};

export default GameDetails;
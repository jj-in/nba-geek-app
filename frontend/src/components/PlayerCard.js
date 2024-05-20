import React, { useEffect, useState } from 'react';
import MyApi from '../utils/MyApi'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

// This has potential to offer more features, such as image, team, #, etc.
// for now we just have player name with link to player page, along with years active to be rendered in favorites list
// Style is effective but card can be designed better with more polish
const PlayerCard = ({ playerId }) => {
  const [playerData, setPlayerData] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await MyApi.fetchPlayerBio(playerId);
        setPlayerData(response);
    } catch (error) {
      setError('Failed to fetch player info');
      console.error('Failed to fetch player info:', error);
    }
  };
  fetchPlayer();
}, [playerId]);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5"><Link to={`/player/${playerId}`}>{playerData.DISPLAY_FIRST_LAST}</Link></CardTitle>
        <CardText>Years Active: {playerData.FROM_YEAR} - {playerData.TO_YEAR}</CardText>
      </CardBody>
    </Card>
  );
}

export default PlayerCard;
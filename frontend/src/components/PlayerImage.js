import React from 'react';
import defaultImage from '../images/silhouette.png';

// player bio photo from nba.com based on our common playerId as a parameter. Many players have photos but many do not,
// so we have stored a generic player silhouette for when our request has an error response

const PlayerImage = ({ playerId }) => {
  const [imgSrc, setImgSrc] = React.useState(`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`);

  const onError = () => {
    setImgSrc(defaultImage);
  };

  return (
    <img src={imgSrc} onError={onError} alt="Player Headshot" />
  );
};

export default PlayerImage;
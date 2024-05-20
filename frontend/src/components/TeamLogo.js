import React from 'react';
import * as NBAIcons from 'react-nba-logos';

// Size can be easily configured (Default of 100px)
// usage could be <TeamLogo teamTricode={tricode} size={50} />
const TeamLogo = ({ teamTricode }) => {
  const LogoComponent = NBAIcons[teamTricode]; 
  return <LogoComponent />;  
};

export default TeamLogo;
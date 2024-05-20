import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { useUser } from '../contexts/UserContext'; 
import AuthApi from '../utils/AuthApi'; 
import './Sidebar.css';

const Sidebar = ({ activeTab, onTabClick }) => {
  const { playerData } = usePlayer();
  const { user } = useUser();  // Access the user object to check if someone is logged in for add to favorites function
  const playerInfo = playerData.playerBio;

  if (!playerData || !playerData.playerBio) {
    return <div>Loading...</div>;
  }

  const handleAddFavorite = async () => {
    if (user && playerInfo.PERSON_ID) {
      try {
        await AuthApi.addFavorite(playerInfo.PERSON_ID);
        alert("Added to favorites!");
      } catch (error) {
        console.error("Failed to add favorite:", error);
        alert("Failed to add to favorites.");
      }    
    } else {
        alert("You must be logged in to add favorites.");
      }
    };

  return (
    <div className="sidebar">
      <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerInfo.PERSON_ID}.png`}
           onError={(e) => e.target.src = '/images/silhouette.png'}
           alt="Player Headshot"
      />
      <div className="player-info">
        <div>{playerInfo.DISPLAY_FIRST_LAST}</div>
        <div>Years active: {playerInfo.FROM_YEAR} - {playerInfo.TO_YEAR}</div>
        <div>DOB: {playerInfo.BIRTHDATE}</div>
      </div>
      <ul>
        <li className={activeTab === 'Favorite' ? 'active tab' : 'tab'} onClick={handleAddFavorite}>Add to Favorites</li>
        <li className={activeTab === 'Career' ? 'active tab' : 'tab'} onClick={() => onTabClick('Career')}>Career</li>
        {playerData.isSynergyDataAvailable ? (
        <li className={activeTab === 'Synergy Plays' ? 'active tab' : 'tab'} onClick={() => onTabClick('Synergy Plays')}>Synergy Plays</li>
        ) : (
        <li>Synergy N/A</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
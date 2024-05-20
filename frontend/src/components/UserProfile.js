import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import PlayerCard from './PlayerCard'
import AuthApi from '../utils/AuthApi';
import './FormStyles.css';

const UserProfile = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, []);

  const fetchFavorites = async () => {
    try {
      const profileData = await AuthApi.fetchUserProfile(user);
      setFavorites(profileData.favorites);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // just using css class to center align
  
  return (
    <div className="main-form">
      <h1>{user}'s Profile</h1>
      <h3>Favorite Players</h3>
      <ul>
        {favorites.map((favorite, index) => (
          <PlayerCard key={index} playerId={favorite}></PlayerCard>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
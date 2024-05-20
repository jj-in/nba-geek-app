import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyApi from '../utils/MyApi';
import BoxScoreTraditional from './BoxScoreTraditional';
import BoxScoreAdvancedPlayer from './BoxScoreAdvancedPlayer';
import BoxScoreHustle from './BoxScoreHustle';
import BoxScoreTracking from './BoxScoreTracking';
import BoxScoreDefense from './BoxScoreDefense';
import BoxScoreTeamStats from './BoxScoreTeamStats'

// Large boxscore component that houses all the specific box score subcomponents, rendered via tabs.
// traditional box loads initially, then each other box score loads via fetch when tab is clicked

const BoxScorePage = () => {
  const { gameId } = useParams();
  const [activeTab, setActiveTab] = useState('traditional');
  const [gameData, setGameData] = useState({});
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect for rendering specific box score components, triggered whenever active tab changes, we store each box score data within
  // our whole gameData state object, so we can toggle back and forth without re-fetching
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (activeTab === 'traditional') {
          const gameData = await MyApi.fetchGameSummary(gameId);
          setGameDetails(gameData);
          const data = await MyApi.fetchTraditionalBox(gameId);
          setGameData({ ...gameData, traditional: data });
        } else if (activeTab === 'advanced') {
          const data = await MyApi.fetchAdvancedPlayerBox(gameId);
          setGameData({ ...gameData, advanced: data });
        }
        else if (activeTab === 'tracking') {
          const data = await MyApi.fetchTrackingBox(gameId);
          setGameData({ ...gameData, tracking: data });
        }
        else if (activeTab === 'hustle') {
          const data = await MyApi.fetchHustleBox(gameId);
          setGameData({ ...gameData, hustle: data });
        }
        else if (activeTab === 'defensive') {
          const data = await MyApi.fetchDefensiveBox(gameId);
          setGameData({ ...gameData, defensive: data });
        }
        else if (activeTab === 'teams') {
          const data = await MyApi.fetchTeamStatsBox(gameId);
          setGameData({ ...gameData, teams: data });
        }
      } catch (error) {
        console.error(`Failed to fetch data for ${activeTab} box score:`, error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [gameId, activeTab]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('traditional')}>Traditional</button>
        <button onClick={() => setActiveTab('advanced')}>Advanced</button>
        <button onClick={() => setActiveTab('tracking')}>Tracking</button>
        <button onClick={() => setActiveTab('hustle')}>Hustle</button>
        <button onClick={() => setActiveTab('defensive')}>Defensive</button>
        <button onClick={() => setActiveTab('teams')}>Team Stats</button>
      </div>
      <div>
        {activeTab === 'traditional' && gameData.traditional && <BoxScoreTraditional data={gameData.traditional} lineScore={gameDetails.TeamScores} />}
        {activeTab === 'advanced' && gameData.advanced && <BoxScoreAdvancedPlayer data={gameData.advanced} />}
        {activeTab === 'tracking' && gameData.tracking && <BoxScoreTracking data={gameData.tracking} />}      
        {activeTab === 'hustle' && gameData.hustle && <BoxScoreHustle data={gameData.hustle} />}      
        {activeTab === 'defensive' && gameData.defensive && <BoxScoreDefense data={gameData.defensive} />}      
        {activeTab === 'teams' && gameData.teams && <BoxScoreTeamStats data={gameData.teams} />}      

      </div>
    </div>
  );
};

export default BoxScorePage;

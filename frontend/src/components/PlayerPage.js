import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerProvider } from '../contexts/PlayerContext';
import Sidebar from './Sidebar';
import PlayerCareer from './PlayerCareer';
import PlayerSynergy from './PlayerSynergy';
import './PlayerPage.css';

const PlayerPage = () => {
    const { playerId } = useParams();
    const [activeTab, setActiveTab] = useState('Career');

    // Function to handle tab click that our sidebar component uses to toggle between player stat tabs
    const onTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    const renderTabContent = () => {
        switch (activeTab) {
          case 'Career':
            return <PlayerCareer />;
            case 'Synergy Plays':
              return <PlayerSynergy />;
          default:
            return <PlayerCareer />;
        }
      };
    
      return (
        <PlayerProvider playerId={playerId}>
          <div style={{ display: 'flex' }}>
            <Sidebar activeTab={activeTab} onTabClick={setActiveTab} />
            <main>{renderTabContent()}</main>
          </div>
        </PlayerProvider>
      );
    };
    
    export default PlayerPage;


    
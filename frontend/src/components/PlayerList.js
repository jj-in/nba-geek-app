import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';
import { useLeague } from '../contexts/LeagueContext';
import './PlayerList.css';

function PlayerList() {
  const { allPlayers, activePlayers } = useLeague();
  const [displayActiveOnly, setDisplayActiveOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [visibleGroups, setVisibleGroups] = useState({});
  const [showAll, setShowAll] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

// we get our list of players from static NBA-API function (contains all player names and IDs), so we can use it as a context value whenever site loads
// we have our list of all players in NBA history sorted alphabetically (surname) on this page with filter for active players as well

// dynamic search function activates after 2 characters to affect our filtered players state (which is what we will always be displaying)
  useEffect(() => {
    const searchPlayers = () => {
      const players = displayActiveOnly ? activePlayers : allPlayers;
      return players.filter(player =>
        searchTerm.length >= 2 ? player.full_name.toLowerCase().includes(searchTerm.toLowerCase()) : true
      );
    };

    const players = searchPlayers();
    const groupedPlayers = groupPlayersByInitial(players);
    setFilteredPlayers(players);

    // Update group visibility settings to allow us to expand/collapse all letters of players (or control each letter individually) 
    // Changes as new groups are formed or if showAll is toggled
    setVisibleGroups(prev => {
      const newGroups = Object.keys(groupedPlayers).reduce((acc, key) => {
        acc[key] = showAll;
        return acc;
      }, {});
      return newGroups;
    });
  }, [allPlayers, activePlayers, searchTerm, displayActiveOnly, showAll]);

  const groupPlayersByInitial = (players) => {
    return players.reduce((acc, player) => {
      const initial = player.full_name.split(' ').pop()[0].toUpperCase();
      if (!acc[initial]) acc[initial] = [];
      acc[initial].push(player);
      return acc;
    }, {});
  };

  const toggleGroupVisibility = (initial) => {
    setVisibleGroups(prev => ({
      ...prev,
      [initial]: !prev[initial]
    }));
  };

  return (
    <div className="page-container">
      <div className="filter-controls">
        <button className="actives-text" onClick={() => setDisplayActiveOnly(prev => !prev)}>
          [Toggle Active Players]
        </button>
        <button className="visibility-text" onClick={() => setShowAll(prev => !prev)}>
          [{!showAll ? 'Expand all' : 'Collapse all'}]
        </button>
        <Input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="full-player-grid">
        {Object.keys(visibleGroups).sort().map(initial => (
          <div key={initial} className="player-group">
            <h3 className="initial-text">{initial}</h3>
            <h5 className="visibility-text" onClick={() => toggleGroupVisibility(initial)}>
              [{visibleGroups[initial] ? 'Collapse' : 'Expand'}]
            </h5>
            {visibleGroups[initial] && (
              <div className="player-list">
                {groupPlayersByInitial(filteredPlayers)[initial]?.map(player => (
                  <Link key={player.id} to={`/player/${player.id}`} className="player-name">
                    {player.full_name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerList;
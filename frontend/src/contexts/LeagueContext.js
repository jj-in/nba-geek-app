import React, { createContext, useContext, useState, useEffect } from 'react';
import MyApi from '../utils/MyApi';

// Context for general league data, such as players and teams list
// to be accessed quickly in any component, including searches

const LeagueContext = createContext();

export const useLeague = () => useContext(LeagueContext);

export const LeagueProvider = ({ children }) => {
    const [allPlayers, setAllPlayers] = useState([]);
    const [activePlayers, setActivePlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const teamTricodes = [
        'ATL',
        'BOS', 
        'BKN',  
        'CHA',  
        'CHI',  
        'CLE',  
        'DAL',  
        'DEN', 
        'DET', 
        'GSW',
        'HOU', 
        'IND', 
        'LAC', 
        'LAL',
        'MEM',
        'MIA',
        'MIL',
        'MIN',
        'NOP',
        'NYK', 
        'OKC',  
        'ORL', 
        'PHI',
        'PHX', 
        'POR',  
        'SAC', 
        'SAS',  
        'TOR', 
        'UTA', 
        'WAS' 
    ]

    useEffect(() => {
        const fetchPlayersAndTeams = async () => {
            try {

                const findAllPlayers = await MyApi.staticAllPlayers();
                setAllPlayers(findAllPlayers);

                const findActivePlayers = await MyApi.staticActivePlayers();
                setActivePlayers(findActivePlayers);

                const findTeams = await MyApi.staticTeams();
                setTeams(findTeams);
            } catch (err) {
                console.log("Error fetching data:", err);
            }
        };

        fetchPlayersAndTeams();
    }, []);

    const value = {
        allPlayers,
        activePlayers,
        teams,
        teamTricodes,
    };

    return <LeagueContext.Provider value={value}>{children}</LeagueContext.Provider>;
};
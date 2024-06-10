import React, { createContext, useContext, useState, useEffect } from 'react';
import MyApi from '../utils/MyApi';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children, playerId }) => {
    const [playerData, setPlayerData] = useState({
        playerBio: null,
        careerData: null,
        synergyData: null,
        gameLogs: null,
        isSynergyDataAvailable: true,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const playerBio = await MyApi.fetchPlayerBio(playerId);
                setPlayerData(prevData => ({ ...prevData, playerBio }));
                const careerData = await MyApi.fetchCareerData(playerId);
                setPlayerData(prevData => ({ ...prevData, careerData }));
                const synergyData = await MyApi.fetchPlayerSynergy(playerId);
                setPlayerData(prevData => ({
                    ...prevData,
                    synergyData,
                    isSynergyDataAvailable: !(synergyData && synergyData.unavailable)
                }));
                const gameLogs = await MyApi.fetchGameLogs(playerId);
                setPlayerData(prevData => ({ ...prevData, gameLogs }));
            } catch (error) {
                console.error("Error fetching player data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (playerId) fetchData();
    }, [playerId]);

    const value = {
        playerId,
        playerData,
        setPlayerData,
        loading,
    };

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

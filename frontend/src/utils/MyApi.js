import axios from "axios";

// Utility class for all NBA-API calls to backend that do not require authorization

// process.env.REACT_APP_BASE_URL || 
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

// Create axios instance with headers for streamlined api request format
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

class MyApi {
  // Fetch all players (static data)
  static async staticAllPlayers() {
    try {
      const response = await api.get('/api/players/all');
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw new Error(error.response.data.error);
    }
  }
  // Fetch all active players (static data)
  static async staticActivePlayers() {
    try {
      const response = await api.get('/api/players/active');
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw new Error(error.response.data.error);
    }
  }

  // Fetch all current teams (static data)
  static async staticTeams() {
    try {
      const response = await api.get('/api/teams/active');
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw new Error(error.response.data.error);
    }
  }

  // Fetch specific team info
  static async fetchTeamInfo(teamId) {
    try {
      const response = await api.get(`/api/teams/info/${teamId}`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw new Error(error.response.data.error);
    }
  }

  // Fetch player bio for playerpage
  static async fetchPlayerBio(playerId) {
    try {
      const response = await api.get(`/api/players/bio/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch player bio ${playerId}:`, error);
      throw new Error(error.response.data.error);
    }
  }

  // Fetch player career data for playerpage
  static async fetchCareerData(playerId) {
    try {
      const response = await api.get(`/api/players/career_stats/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch player career data ${playerId}:`, error);
      throw new Error(error.response.data.error);
    }
  }
  
  static async fetchGameLogs(playerId) {
    try {
      const response = await api.get(`/api/players/game_logs/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch player data ${playerId}:`, error);
      throw new Error(error.response.data.error);
    }
  }

  // Fetch player playtype tracking for playerpage
  static async fetchPlayerSynergy (playerId) {
    try {
      const response = await api.get(`/api/players/synergy/${playerId}`);
      console.log(response)
      if (response.data.unavailable) {
        return { unavailable: true };
      }
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch player synergy data ${playerId}:`, error);
      throw error;
    }
  }

  // Fetch entire league playtype tracking for main stats page
  static async fetchSynergyData(page, per_page, sort_by, order, season, playType, playerName, team, minGames, minPoss, minPPP) {
    let params = new URLSearchParams({
        page: page.toString(),
        per_page: per_page.toString(),
        sort_by: sort_by,
        order: order
    });

    if (season !== 'All') params.append('season', season);
    if (playType !== 'All') params.append('play_type', playType);
    if (playerName) params.append('player', playerName);
    if (team) params.append('team', team);
    if (minGames > 0) params.append('min_games', minGames.toString());
    if (minPoss > 0) params.append('min_poss', minPoss.toString());
    if (minPPP > 0) params.append('min_ppp', minPPP.toString());


    try {
        console.log(params.toString())
        const response = await api.get(`/api/players/synergy?${params.toString()}`);
        console.log(response)
        return response.data
    } catch (error) {
        console.error('Error fetching synergy data:', error);
        throw error;
    }
}
  
  // fetch team roster object with player info and link to player page with specific season parameter
  static async fetchRoster (teamId, season) {
    try {
      const response = await api.get(`/api/teams/roster/${teamId}/${season}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch team roster ${teamId}:`, error);
      throw error;
    }
  }

  // fetch today's scores for homepage
  static async fetchLiveScores() {
    try {
      const response = await api.get(`/api/schedule/live`);
      return response.data
    } catch (error) {
      console.error("Failed to fetch today's scoreboard:", error);
      throw error;
    }
  }

  // fetch any date's scores with objects for each game
  static async fetchOldGames(game_date) {
    try {
      const response = await api.get(`/api/schedule/${game_date}`);
      return response.data
    } catch (error) {
      console.error("Failed to fetch today's scoreboard:", error);
      throw error;
    }
  }
  
  // fetch any game's basic details
  static async fetchGameSummary(gameId) {
    try {
      const response = await api.get(`/api/games/${gameId}`);
      return response.data
    } catch (error) {
      console.error(`Failed to fetch details for ${gameId}:`, error);
      throw error;
    }
  }

  // fetch a game's traditional  team vs team stats
  static async fetchTeamStatsBox(gameId) {
    try {
      const response = await api.get(`/api/games/boxscore/team_stats/${gameId}`);
      return response.data
    } catch (error) {
      console.error(`Failed to fetch details for ${gameId}:`, error);
      throw error;
    }
  }

  // fetch a game's traditional box score for all players on both teams
  static async fetchTraditionalBox(gameId) {
    try {
      const response = await api.get(`/api/games/boxscore/traditional/${gameId}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch traditional box score ${gameId}:`, error);
      throw error;
    }
  }


  // fetch a game's advanced stats box score for all players on both teams
  static async fetchAdvancedPlayerBox(gameId) {
    try {
      const response = await api.get(`/api/games/boxscore/advanced_player/${gameId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch advanced box score ${gameId}:`, error);
      throw error;
    }
  }

  // fetch a game's advanced stats box score for both teams (not currently in use)
  static async fetchAdvancedTeamBox(gameId) {
    try {
      const response = await api.get(`/api/games/boxscore/advanced_team/${gameId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch advanced box score ${gameId}:`, error);
      throw error;
    }
  }

  // fetch a game's defensive stats box score for all players on both teams
  static async fetchDefensiveBox(gameId) {
    try {
      const response = await api.get(`/api/games/boxscore/defensive/${gameId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch defensive box score ${gameId}:`, error);
      throw error;
    }
  }

  // fetch a game's tracking stats box score for all players on both teams
  static async fetchTrackingBox(gameId) {
    try {
      const response = await api.get(`/api/games/boxscore/tracking/${gameId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch tracking box score ${gameId}:`, error);
      throw error;
    }
  }

  // fetch a game's hustle stats box score for all players on both teams
  static async fetchHustleBox(gameId) {
    try {
      const response = await api.get(`/api/games/boxscore/hustle/${gameId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch hustle box score ${gameId}:`, error);
      throw error;
    }
  }
};


export default MyApi;
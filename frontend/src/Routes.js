import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import HomePage from './components/HomePage';
import PlayerList from './components/PlayerList';
import TeamsList from './components/TeamsList';
import PlayerPage from './components/PlayerPage';
import TeamRoster from './components/TeamRoster';
import BoxScorePage from './components/BoxScorePage';
import GameDetails from './components/GameDetails';
import SynergyDataPage from './components/SynergyDataPage';
import NotFound from './components/NotFound';
import { LeagueProvider } from './contexts/LeagueContext'
import Footer from './components/Footer';


const ReactRoutes = () => {
  return (
        <LeagueProvider>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/players" element={<PlayerList />} />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/player/:playerId" element={<PlayerPage />} />
            <Route path="/synergy/league" element={<SynergyDataPage />} />
            <Route path="/team/:teamId" element={<TeamRoster />} />
            <Route path="/game/:gameId" element={<GameDetails />} />
            <Route path="/game/boxscore/:gameId" element={<BoxScorePage />} />
            <Route path="*" element={<NotFound />} /> 
        </Routes>
        <Footer />
        </LeagueProvider>
  );
}

export default ReactRoutes;
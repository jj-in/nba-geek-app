import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './HomePage.css';
import Scoreboard from './Scoreboard';

const HomePage = () => {

  return (
    <>
    <div className="main-container">
      <div className="welcome">
        <h3>
          Welcome! Go beyond the box score with advanced stats and tracking data.
        </h3>
        <h3>FAQ</h3>
        <p><b>What is Synergy Play Data</b></p>
        <p>NBA Synergy Play Data provides tracks a player's success in specific play types. Synergy uses tracking technology to measure the efficiency of a player whenever they are involved in a scoring opportunity.</p>
        <p><b>Is it available for every player in NBA history?</b></p>
        <p>Unfortunately not. The data goes back to 2016. We do have all of the available Synergy data since then to search and sort.</p>
        <p><b>What other stats do you have to go beyond the box score?</b></p>
        <p>We have multi-layered box scores with advanced stats and more tracking data! Heads up, games before 2000 are unlikely to have these extra box score options, but you can still view the traditional box score for any historical game!</p>
        <h4><Link to="/glossary">Glossary</Link></h4>
      </div>
      <div className="scores">
        <Scoreboard />
        <h4><Link to="/scores">Find Scores By Date</Link></h4>
      </div>
    </div>
    </>
  );
}

export default HomePage;

// src/components/NotFound.js
import React from 'react';

const Glossary = () => {
    return (
        <div className="glossary">
        <p><b>Glossary</b></p>
        <ul className="list">Types of Synergy Play Data
          <li><strong>Pick-and-Roll Ball Handler</strong>: Performance when the player is handling the ball in a pick-and-roll situation.</li>
          <li><strong>Pick-and-Roll Roll Man</strong>: Performance when the player is the screener in a pick-and-roll situation.</li>
          <li><strong>Isolation</strong>: Performance when the player is isolated against a defender.</li>
          <li><strong>Post-Up</strong>: Performance when the player is posting up against a defender.</li>
          <li><strong>Spot-Up</strong>: Performance when the player catches and shoots or drives off a catch.</li>
          <li><strong>Off-Screen</strong>: Performance when the player receives the ball after running off a screen.</li>
          <li><strong>Hand-Off</strong>: Performance when the player receives a hand-off and creates a scoring opportunity.</li>
          <li><strong>Cut</strong>: Performance when the player makes a cut to the basket.</li>
        </ul>
        <ul className="list">Traditional Box Score Stats
            <li><strong>Points (PTS)</strong></li>
            <li><strong>Field Goals Made (FGM) / Field Goals Attempted (FGA) / Field Goal Percentage (FG%)</strong></li>
            <li><strong>Three-Point Field Goals Made (3PM) / Three-Point Field Goals Attempted (3PA) / Three-Point Field Goal Percentage (3P%)</strong></li>
            <li><strong>Free Throws Made (FTM) / Free Throws Attempted (FTA) / Free Throw Percentage (FT%)</strong></li>
            <li><strong>Rebounds (REB) [Offensive (OREB) and Defensive (DREB)]</strong></li>
            <li><strong>Assists (AST)</strong></li>
            <li><strong>Steals (STL)</strong></li>
            <li><strong>Blocks (BLK)</strong></li>
            <li><strong>Turnovers (TO)</strong></li>
            <li><strong>Personal Fouls (PF)</strong></li>
        </ul>
        <ul className="list">Advanced Box Score Stats
            <li><strong>Player Efficiency Rating (PER)</strong></li>
            <li><strong>True Shooting Percentage (TS%)</strong></li>
            <li><strong>Effective Field Goal Percentage (eFG%)</strong></li>
            <li><strong>Usage Rate (USG%)</strong></li>
            <li><strong>Offensive Rating (ORtg) / Defensive Rating (DRtg)</strong></li>
            <li><strong>Win Shares (WS) / Win Shares per 48 minutes (WS/48)</strong></li>
        </ul>
        <ul className="list">Tracking Box Score Stats
            <li><strong>Speed and Distance</strong>: Average speed and total distance covered by a player during a game.</li>
            <li><strong>Drives</strong>: Number of times a player drives to the basket.</li>
            <li><strong>Touches</strong>: Number of times a player touches the ball during a game.</li>
            <li><strong>Passes</strong>: Number of passes made by a player.</li>
            <li><strong>Rebounding Opportunities</strong>: Number of rebounding chances a player has during a game.</li>
        </ul>
        <ul className="list">Hustle Box Score Stats
            <li><strong>Deflections</strong>: Number of times a player deflects the ball.</li>
            <li><strong>Loose Balls Recovered</strong>: Number of loose balls recovered by a player.</li>
            <li><strong>Charges Drawn</strong>: Number of offensive fouls drawn by a player.</li>
            <li><strong>Screen Assists</strong>: Number of times a player's screen directly leads to a made basket by a teammate.</li>
        </ul>
        <ul className="list">Defensive Box Score Stats
            <li><strong>Opponent Field Goal Percentage</strong>: The shooting percentage of opponents when defended by a specific player.</li>
            <li><strong>Contested Shots</strong>: Number of shots contested by a player.</li>
            <li><strong>Defensive Rebounds (DREB)</strong>: Number of defensive rebounds grabbed by a player.</li>
            <li><strong>Blocks (BLK)</strong>: Number of shots blocked by a player.</li>
            <li><strong>Steals (STL)</strong>: Number of times a player steals the ball from an opponent.</li>
        </ul>

        </div>
    );
};

export default Glossary;

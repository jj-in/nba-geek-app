import React from 'react';
import { Table } from 'reactstrap';

const ScoreTable = ({ teamScores }) => {
    if(!Object.keys(teamScores[1])[0]) return;
    
    const quarters = ['QTR1', 'QTR2', 'QTR3', 'QTR4'];
    const overtimes = ['OT1', 'OT2', 'OT3', 'OT4', 'OT5', 'OT6', 'OT7', 'OT8', 'OT9', 'OT10'];
    const awayTeam = Object.keys(teamScores[1])[0];
    const awayTeamScore = teamScores[1][awayTeam];
    const homeTeam = Object.keys(teamScores[0])[0];
    const homeTeamScore = teamScores[0][homeTeam];

    return (
        <Table bordered hover>
            <thead>
                <tr>
                    <th>Scoring</th>
                    {quarters.map((quarter) => (
                        <th key={quarter}>{quarter}</th>
                    ))}
                    {overtimes.filter((ot) => teamScores.some((team) => team[Object.keys(team)[0]][`PTS_${ot}`] > 0)).map((ot) => (
                        <th key={ot}>{ot}</th>
                    ))}
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr key='awayTeamRow'>
                    <td>{awayTeam}</td>
                    {quarters.map((quarter) => (
                        <td key={`awayTeam-${quarter}`}>{awayTeamScore[`PTS_${quarter}`]}</td>
                    ))}
                    {overtimes
                        .filter((ot) => awayTeamScore[`PTS_${ot}`] > 0)
                        .map((ot) => (
                            <td key={`awayTeam-${ot}`}>{awayTeamScore[`PTS_${ot}`]}</td>
                    ))}
                    <td>{awayTeamScore.PTS}</td>
                </tr>
                <tr key='homeTeamRow'>
                    <td>{homeTeam}</td>
                    {quarters.map((quarter) => (
                        <td key={`homeTeam-${quarter}`}>{homeTeamScore[`PTS_${quarter}`]}</td>
                    ))}
                    {overtimes
                        .filter((ot) => homeTeamScore[`PTS_${ot}`] > 0)
                        .map((ot) => (
                            <td key={`homeTeam-${ot}`}>{homeTeamScore[`PTS_${ot}`]}</td>
                    ))}
                    <td>{homeTeamScore.PTS}</td>
                </tr>
            </tbody>
        </Table>
    );
};

export default ScoreTable;

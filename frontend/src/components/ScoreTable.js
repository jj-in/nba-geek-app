import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// linescore component for top of traditional box score, game json object returns key/value (0 if no OT period)
// for up to 10 Overtimes, so we need the filter logic to only display the actual periods of play (based on any positive points)
const ScoreTable = ({ teamScores }) => {
    const quarters = ['QTR1', 'QTR2', 'QTR3', 'QTR4'];
    const overtimes = ['OT1', 'OT2', 'OT3', 'OT4', 'OT5', 'OT6', 'OT7', 'OT8', 'OT9', 'OT10'];
    const awayTeam = Object.keys(teamScores[1])[0]
    const awayTeamScore = teamScores[1][awayTeam]
    const homeTeam = Object.keys(teamScores[0])[0]
    const homeTeamScore = teamScores[0][homeTeam]

    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Scoring</TableCell>
                {quarters.map((quarter) => (
                <TableCell key={quarter}>{quarter}</TableCell>
                ))}
                {overtimes.filter((ot) => teamScores.some((team) => team[Object.keys(team)[0]][`PTS_${ot}`] > 0)).map((ot) => (
                <TableCell key={ot}>{ot}</TableCell>
                ))}
                <TableCell>Total</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key='awayTeamRow'>
                    <TableCell>{awayTeam}</TableCell>
                        {quarters.map((quarter) => (
                            <TableCell key={`awayTeam-${quarter}`}>{awayTeamScore[`PTS_${quarter}`]}</TableCell>
                        ))}
                        {overtimes
                            .filter((ot) => awayTeamScore[`PTS_${ot}`] > 0)
                            .map((ot) => (
                                <TableCell key={`awayTeam-${ot}`}>{awayTeamScore[`PTS_${ot}`]}</TableCell>
                        ))}
                    <TableCell>{awayTeamScore.PTS}</TableCell>
                </TableRow>
                <TableRow key='homeTeamRow'>
                    <TableCell>{homeTeam}</TableCell>
                        {quarters.map((quarter) => (
                            <TableCell key={`homeTeam-${quarter}`}>{homeTeamScore[`PTS_${quarter}`]}</TableCell>
                        ))}
                        {overtimes
                            .filter((ot) => homeTeamScore[`PTS_${ot}`] > 0)
                            .map((ot) => (
                                <TableCell key={`homeTeam-${ot}`}>{homeTeamScore[`PTS_${ot}`]}</TableCell>
                        ))}
                    <TableCell>{homeTeamScore.PTS}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
    );
};

export default ScoreTable;
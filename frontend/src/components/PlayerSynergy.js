import React, { useState, useEffect } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, BarElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

ChartJS.register(CategoryScale, BarElement, LinearScale, Title, Tooltip, Legend);

function PlayerSynergy() {
    const { playerData } = usePlayer();
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedPlayType, setSelectedPlayType] = useState('All');
    const [selectedStat, setSelectedStat] = useState('ppp');
    const [filteredData, setFilteredData] = useState([]);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [sortConfig, setSortConfig] = useState({ key: 'Season', direction: 'asc' });

    // Create our lists of a player's valid seasons and playtypes for filtering first, making sure our select menu is populated
    useEffect(() => {
        if (playerData && playerData.synergyData) {
            const seasons = [...new Set(playerData.synergyData.map(data => data.season_id))].filter(Boolean);
            const playTypes = [...new Set(playerData.synergyData.map(data => data.play_type))].filter(Boolean);
            setSelectedYear(seasons.includes(selectedYear) ? selectedYear : 'All');
            setSelectedPlayType(playTypes.includes(selectedPlayType) ? selectedPlayType : 'All');
        }
    }, [playerData, selectedYear, selectedPlayType]);

    // Effect for filtering data, renders whenever we change season, playtype or sort category/direction
    useEffect(() => {
        if (playerData && playerData.synergyData) {
            let filtered = [...playerData.synergyData];
            if (selectedYear !== 'All') {
                filtered = filtered.filter(item => item.season_id === selectedYear);
            }
            if (selectedPlayType !== 'All') {
                filtered = filtered.filter(item => item.play_type === selectedPlayType);
            }
            filtered.sort((a, b) => {
                const comparison = a[sortConfig.key] < b[sortConfig.key] ? -1 : 1;
                return sortConfig.direction === 'asc' ? comparison : -comparison;
            });
            setFilteredData(filtered);
        }
    }, [playerData, selectedYear, selectedPlayType, sortConfig]);

    // Effect for updating chart data to create bar graph showing the player's performance within filtered selection
    useEffect(() => {
        if (filteredData.length > 0) {
            setChartData({
                labels: filteredData.map(item => item.play_type),
                datasets: [{
                    label: `Player Synergy Data - ${selectedStat.toUpperCase()}`,
                    data: filteredData.map(item => item[selectedStat]),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderColor: 'rgba(53, 162, 235, 1)',
                    borderWidth: 1,
                }]
            });
        }
    }, [filteredData, selectedStat]);

    if (!playerData || !playerData.synergyData) {
        return <div>Loading synergy data...</div>;
    }

    const handleYearChange = (event) => setSelectedYear(event.target.value);
    const handlePlayTypeChange = (event) => setSelectedPlayType(event.target.value);
    const requestSort = (key) => setSortConfig({
        key,
        direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });

    return (
        <div>
            <h2>Player Synergy Data</h2>
            <FormControl fullWidth margin="normal">
                <InputLabel>Season</InputLabel>
                <Select value={selectedYear} label="Season" onChange={handleYearChange}>
                    <MenuItem value="All">All</MenuItem>
                    {playerData.synergyData
                        .map(data => data.season_id)
                        .filter((value, index, self) => value && self.indexOf(value) === index)
                        .map(season => (
                            <MenuItem key={season} value={season}>{season}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Play Type</InputLabel>
                <Select value={selectedPlayType} label="Play Type" onChange={handlePlayTypeChange}>
                    <MenuItem value="All">All</MenuItem>
                    {playerData.synergyData
                        .map(data => data.play_type)
                        .filter((value, index, self) => value && self.indexOf(value) === index)
                        .map(playType => (
                            <MenuItem key={playType} value={playType}>{playType}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['Season', 'Play Type', 'GP', 'PPP', 'Possessions', 'Points', 'FG%', 'EFG%', 'Frequency', 'Score Frequency', 'Percentile'].map((col) => (
                                <TableCell key={col}>
                                    <TableSortLabel
                                        active={sortConfig.key === col}
                                        direction={sortConfig.direction}
                                        onClick={() => requestSort(col)}>
                                        {col}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.season_id}</TableCell>
                                <TableCell>{item.play_type}</TableCell>
                                <TableCell>{item.gp}</TableCell>
                                <TableCell>{item.ppp}</TableCell>
                                <TableCell>{item.poss}</TableCell>
                                <TableCell>{item.pts}</TableCell>
                                <TableCell>{(item.fg_pct * 100).toFixed(1)}%</TableCell>
                                <TableCell>{(item.efg_pct * 100).toFixed(1)}%</TableCell>
                                <TableCell>{(item.frequency * 100).toFixed(1)}%</TableCell>
                                <TableCell>{(item.score_frequency * 100).toFixed(1)}%</TableCell>
                                <TableCell>{(item.percentile * 100).toFixed(1)}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <FormControl fullWidth>
                <InputLabel>Stat Category</InputLabel>
                <Select
                    value={selectedStat}
                    label="Stat Category"
                    onChange={e => setSelectedStat(e.target.value)}>
                    <MenuItem value="ppp">Points Per Possession</MenuItem>
                    <MenuItem value="pts">Points</MenuItem>
                    <MenuItem value="fg_pct">FG%</MenuItem>
                </Select>
            </FormControl>
            <Bar data={chartData} />
        </div>
    );
}

export default PlayerSynergy;

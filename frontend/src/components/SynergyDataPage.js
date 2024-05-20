import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyApi from '../utils/MyApi';
import { useLeague } from '../contexts/LeagueContext';
import { Input, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material';
import './SynergyDataPage.css'

const SynergyDataPage = () => {
  const [synergyData, setSynergyData] = useState({ data: [], total: 0, pages: 0, current_page: 1 });
  const { teamTricodes } = useLeague();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [filters, setFilters] = useState({
    season: '2023-24',
    playType: 'All',
    playerName: '',
    team: '',
    minGames: 0,
    minPoss: 0,
    minPPP: 0.0
  });
  const [sortParams, setSortParams] = useState({ sort_by: 'pts', order: 'desc' });

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await MyApi.fetchSynergyData(page + 1, rowsPerPage, sortParams.sort_by, sortParams.order, filters.season, filters.playType, filters.playerName, filters.team, filters.minGames, filters.minPoss, filters.minPPP);
            setSynergyData(response);
        } catch (error) {
            console.error('Error fetching synergy data:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, [page, rowsPerPage, sortParams, filters]);  // Ensure filters is treated properly as a dependency

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSortChange = (col) => {
    const isDesc = sortParams.sort_by === col && sortParams.order === 'desc';
    setSortParams({ sort_by: col, order: isDesc ? 'asc' : 'desc' });
  };

  if (loading) return <div>Loading...</div>;
  if (!synergyData.data.length) return <div>No data available.</div>;

  return (
    <Paper className="synergy-data-container" sx={{ margin: 2, padding: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Synergy Data
      </Typography>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
          <InputLabel id="season-select-label">Season</InputLabel>
          <Select
              labelId="season-select-label"
              value={filters.season}
              onChange={e => handleFilterChange('season', e.target.value)}>
              {['All', '2023-24', '2022-23', '2021-22', '2020-21', '2019-20', '2018-19'].map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
          <InputLabel id="playtype-select-label">Play Type</InputLabel>
          <Select
              labelId="playtype-select-label"
              value={filters.playType}
              onChange={e => handleFilterChange('playType', e.target.value)}
          >
              <MenuItem value="All">All</MenuItem>
              {['Isolation', 'Transition', 'PRBallHandler', 'PRRollman', 'Postup', 'Spotup', 'Handoff', 'Cut', 'OffScreen', 'OffRebound', 'Misc'].map(playType => (
                  <MenuItem key={playType} value={playType}>{playType}</MenuItem>
              ))}
          </Select>
        </FormControl>
        </Grid>        
        <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel id="team-select-label">Team</InputLabel>
          <Select
            labelId="team-select-label"
            value={filters.team}
            onChange={e => handleFilterChange('team', e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {teamTricodes.map(team => (
              <MenuItem key={team} value={team}>{team}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel id="player-search-label">Player Name</InputLabel>
          <Input
            id="player-search"
            value={filters.playerName}
            onChange={e => handleFilterChange('playerName', e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl fullWidth>
          <InputLabel id="min-games-label">Min. Games</InputLabel>
          <Select
            labelId="min-games-label"
            value={filters.minGames}
            onChange={e => handleFilterChange('minGames', e.target.value)}
          >
            <MenuItem value={0}>All</MenuItem>
            {[1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80].map(value => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl fullWidth>
          <InputLabel id="min-poss-label">Min. Possessions</InputLabel>
          <Select
            labelId="min-poss-label"
            value={filters.minPoss}
            onChange={e => handleFilterChange('minPoss', e.target.value)}
          >
            <MenuItem value={0}>All</MenuItem>
            {[10, 20, 30, 40, 50, 75, 100, 125, 150, 175, 200, 250, 300, 350, 400, 450, 500].map(value => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl fullWidth>
          <InputLabel id="min-ppp-label">Min. PPP</InputLabel>
          <Select
            labelId="min-ppp-label"
            value={filters.minPPP}
            onChange={e => handleFilterChange('minPPP', e.target.value)}
          >
            <MenuItem value={0}>All</MenuItem>
            {[0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0].map(value => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
      <TableContainer component={Paper} sx={{marginTop: 2}}>
        <Table size="small">
            <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                    {[['player_name', 'Player'], ['season_id', 'Season'], ['team_abbreviation', 'Team'], ['play_type', 'Play Type'], ['gp', 'GP'], ['ppp', 'PPP'], ['poss', 'Possessions'], ['pts', 'Points'], ['fg_pct', 'FG%'], ['efg_pct', 'EFG%'], ['frequency', 'Frequency'], ['score_frequency', 'Score Frequency'], ['percentile', 'Percentile']].map((col) => (
                        <TableCell key={col[1]} onClick={() => handleSortChange(col[0])} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            {col[1]}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {synergyData.data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index+1}</TableCell>
                        <TableCell><Link to={`/player/${item.player_id}`}>{item.player_name}</Link></TableCell>
                        <TableCell>{item.season_id}</TableCell>
                        <TableCell>{item.team_abbreviation}</TableCell>
                        <TableCell>{item.play_type}</TableCell>
                        <TableCell>{item.gp}</TableCell>
                        <TableCell>{parseFloat(item.ppp).toFixed(3)}</TableCell>
                        <TableCell>{item.poss}</TableCell>
                        <TableCell>{item.pts}</TableCell>
                        <TableCell>{(parseFloat(item.fg_pct) * 100).toFixed(1)}%</TableCell>
                        <TableCell>{(parseFloat(item.efg_pct) * 100).toFixed(1)}%</TableCell>
                        <TableCell>{(parseFloat(item.frequency) * 100).toFixed(1)}%</TableCell>
                        <TableCell>{(parseFloat(item.score_frequency) * 100).toFixed(1)}%</TableCell>
                        <TableCell>{(parseFloat(item.percentile) * 100).toFixed(1)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={-1}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SynergyDataPage;

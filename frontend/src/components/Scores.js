import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, Button, Spinner, Alert } from 'reactstrap';
import MyApi from '../utils/MyApi';
import { months, getMaxDays, years } from '../utils/calendarUtil';

const Scores = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ month: '01', day: '01', year: '2023' });
  const [searchDate, setSearchDate] = useState({ month: '01', day: '01', year: '2023' });
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      if (!selectedDate.day || !selectedDate.month || !selectedDate.year) return;

      setLoading(true);
      const dateString = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day.padStart(2, '0')}`;
      try {
        const response = await MyApi.fetchOldGames(dateString);
        if (response.length === 0) {
          setDateError('No games found on this date.');
          setGames([]);
        } else {
          setGames(response);
          setDateError('');
        }
      } catch (error) {
        console.error('Failed to fetch scores:', error);
        setDateError('Failed to fetch scores.');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [searchDate]);

  const handleDateChange = (field, value) => {
    if (field === 'month') {
      setSelectedDate(prev => ({ ...prev, [field]: value, day: '01' })); // Reset day to 1 when month changes
    } else {
      setSelectedDate(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { month, day, year } = selectedDate;
    if (month && day && year) {
      setSearchDate({ month, day, year });
    } else {
      setDateError('Please fill in all date fields.');
    }
  };

  return (
    <Container>
      <h4>Find scores from any date in NBA history!</h4>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="month">Month</Label>
          <Input
            type="select"
            name="month"
            id="month"
            value={selectedDate.month}
            onChange={e => handleDateChange('month', e.target.value)}
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="day">Day</Label>
          <Input
            type="select"
            name="day"
            id="day"
            value={selectedDate.day}
            onChange={e => handleDateChange('day', e.target.value)}
          >
            {Array.from({ length: getMaxDays(selectedDate.month) }, (_, i) => i + 1).map(day => (
              <option key={day} value={String(day).padStart(2, '0')}>
                {day}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="year">Year</Label>
          <Input
            type="number"
            name="year"
            id="year"
            value={selectedDate.year}
            onChange={e => handleDateChange('year', e.target.value)}
            min="1946"
            max="2023"
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Fetch Scores
        </Button>
      </Form>
      {loading ? (
        <Spinner />
      ) : dateError ? (
        <Alert color="danger">{dateError}</Alert>
      ) : (
        games.map(game => (
          <div key={game.GameDetails[0].GAME_ID} style={{ width: '500px', margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>
              <Link to={`/game/boxscore/${game.GameDetails[0].GAME_ID}`}>
                {game.GameDetails[0].HOME_NAME} vs {game.GameDetails[0].AWAY_NAME}
              </Link>
            </h3>
            <p>Score: {game.GameDetails[0].HOME_SCORE} - {game.GameDetails[0].AWAY_SCORE}</p>
          </div>
        ))
      )}
    </Container>
  );
};

export default Scores;

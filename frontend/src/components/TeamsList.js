import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import { useLeague } from '../contexts/LeagueContext';

function TeamsList() {
  const { teams } = useLeague();

  return (
    <div>
      <ListGroup>
        {teams.map(team => (
          <ListGroupItem key={team.id}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">
                  <Link to={`/team/${team.id}`} style={{ textDecoration: 'none' }}>
                    {team.city} {team.nickname}
                  </Link>
                </CardTitle>
              </CardBody>
            </Card>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default TeamsList;
import React, { useState, useEffect, createContext, useContext } from 'react';
import Player from './Player';
import LineupBoard from './components/LineupBoard/lineup_board';
import PlayersList from './components/PlayersList/players_list'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Position, Team } from './Constants';
import { loadAllPlayers, loadGameweekFixtures, loadManagerGameweek } from './data_loader';
import { SelectionContext } from './contexts/Selection';

const allPlayers: Map<string, Player> = new Map();

function App() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentGameweek, setCurrentGameweek] = useState(0);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [gameweekFixtures, setGameweekFixtures] = useState<Map<Team, string[]>>(new Map());
  const { state, dispatch } = useContext(SelectionContext);

  useEffect(() => {
    loadAllPlayers()
      .then(
        (players) => {
          for (const player of players) {
            allPlayers.set(player.id, player);
          }
          setAvailablePlayers(players);
        })
      .then(loadManagerGameweek).then((picks) => {
        const startingPlayers = picks.startingPlayersIds.map((playerId: string) => allPlayers.get(playerId)!);
        state.lineup.fillPlayerPositions(startingPlayers);
        const benchPlayers = picks.benchPlayersIds.map((playerId: string) => allPlayers.get(playerId)!);
        state.lineup.setBench(benchPlayers);
      })
      .then(loadGameweekFixtures).then((gameweekFixtures) => {
        setGameweekFixtures(gameweekFixtures);
        setIsLoaded(true);
      })
      .catch(
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error: Error) => {
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App mt-3">
        <Container>
          <Row>
            <Col lg={8} md={12}>
              <LineupBoard gameweekFixtures={gameweekFixtures} />
            </Col>
            <Col lg={4}>
              <PlayersList availablePlayers={availablePlayers} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

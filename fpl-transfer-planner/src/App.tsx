import React, { useState, useEffect, createContext } from 'react';
import Player from './Player';
import LineupBoard from './LineupBoard/lineup_board';
import PlayersList from './PlayersList/players_list'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Position, Team } from './Constants';
import { loadAllPlayers, loadGameweekFixtures, loadManagerGameweek } from './data_loader';
import { Lineup } from './Lineup';
import { defaultSelectionContext } from './SelectionContext';

const allPlayers: Map<string, Player> = new Map();
const lineup = new Lineup();
export const LineupContext = createContext(lineup);
export const SelectionContext = createContext(defaultSelectionContext);

function App() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentGameweek, setCurrentGameweek] = useState(0);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [gameweekFixtures, setGameweekFixtures] = useState<Map<Team, string[]>>(new Map());

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
        lineup.fillPlayerPositions(startingPlayers);
        const benchPlayers = picks.benchPlayersIds.map((playerId: string) => allPlayers.get(playerId)!);
        lineup.setBench(benchPlayers);
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
          <LineupContext.Provider value={lineup}>
            <SelectionContext.Provider value={defaultSelectionContext}>
              <Row>
                <Col lg={8} md={12}>
                  <LineupBoard gameweekFixtures={gameweekFixtures} />
                </Col>
                <Col lg={4}>
                  <PlayersList availablePlayers={availablePlayers} />
                </Col>
              </Row>
            </SelectionContext.Provider>
          </LineupContext.Provider>
        </Container>
      </div>
    );
  }
}

export default App;

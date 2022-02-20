import React, { useState, useEffect } from 'react';
import Player from './Player';
import Lineup from './Lineup/lineup';
import PlayersList from './PlayersList/players_list'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { initializeApp } from 'firebase/app'
import { Position, Team } from './Constants';
import { loadAllPlayers, loadGameweekFixtures, loadManagerGameweek } from './data_loader';

initializeApp({
  apiKey: "AIzaSyA9JHTFYdbwL1N6d-lMD2l1U4cC4WCltv0",
  authDomain: "fpl-transfer-planner.firebaseapp.com",
  projectId: "fpl-transfer-planner",
  storageBucket: "fpl-transfer-planner.appspot.com",
  messagingSenderId: "1089247855703",
  appId: "1:1089247855703:web:a6ae6ff4ccc5c9eebc4f12",
  measurementId: "G-F48E6VR3QZ"
})

const allPlayers: Map<string, Player> = new Map();

function App() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentGameweek, setCurrentGameweek] = useState(0);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);
  const [benchedPlayers, setBenchedPlayers] = useState<Player[]>([]);
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
        const startingPlayersData = picks.startingPlayersIds.map((playerId: string) => allPlayers.get(playerId)!);
        setStartingPlayers(startingPlayersData);
        const benchPlayersData = picks.benchPlayersIds.map((playerId: string) => allPlayers.get(playerId)!);
        setBenchedPlayers(benchPlayersData);
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
      <div className="App m-5">
        <Container>
          <Row>
            <Col lg={8} md={12}>
              <Lineup startingPlayers={startingPlayers} benchedPlayers={benchedPlayers} gameweekFixtures={gameweekFixtures} />
            </Col>
            <Col xs={4}>
              <PlayersList availablePlayers={availablePlayers} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

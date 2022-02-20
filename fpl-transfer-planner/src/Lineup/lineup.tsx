import React from 'react';
import SelectedPlayer from '../SelectedPlayer/selected_player';
import styles from './styles.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Position, Team } from '../Constants'
import Player from '../Player';
import { loadGameweekFixtures } from '../data_loader';

type LineupProps = {
    startingPlayers: Player[]
    benchedPlayers: Player[]
    gameweekFixtures: Map<Team, string[]>
}

let fixtures = new Map<Team, string[]>();

function renderRow(poisitionPlayers: Player[]) {
    if (poisitionPlayers.length === 0) return;

    return (
        <Row key={poisitionPlayers[0].position} className="justify-content-center">
            {poisitionPlayers.map(player => (
                <Col className="d-flex justify-content-md-center" key={player.name}>
                    <SelectedPlayer player={player} opponents={fixtures.get(player.team)!} />
                </Col>
            ))}
        </Row>)
}

function Lineup({ startingPlayers, benchedPlayers, gameweekFixtures }: LineupProps) {
    fixtures = gameweekFixtures;
    const goalkeeper = [], defenders = [], midfielders = [], forwards = [];
    for (const startingPlayer of startingPlayers) {
        switch (startingPlayer.position) {
            case Position.GK:
                goalkeeper.push(startingPlayer);
                continue;
            case Position.DEF:
                defenders.push(startingPlayer);
                continue;
            case Position.MID:
                midfielders.push(startingPlayer);
                continue;
            case Position.FWD:
                forwards.push(startingPlayer);
                continue;
            default:
        }
    }
    const positions = [goalkeeper, defenders, midfielders, forwards];

    return (
        <div className={styles.Lineup}>
            <div className={styles.FieldBackground}>
                <div className={styles.Field}>
                    <div className={styles.StartingPlayersWrapper}>
                        {positions.map(position => (
                            renderRow(position)
                        ))}
                    </div>
                </div>
                <div className={styles.Bench}>
                    {renderRow(benchedPlayers)}
                </div>
            </div>
        </div>
    )
}

export default Lineup;
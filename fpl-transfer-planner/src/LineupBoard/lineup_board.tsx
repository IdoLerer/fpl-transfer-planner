import React from 'react';
import SelectedPlayer from '../SelectedPlayer/selected_player';
import styles from './styles.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Position, Team } from '../Constants'
import Player from '../Player';
import { LineupContext } from '../App';
import { loadGameweekFixtures } from '../data_loader';

type LineupProps = {
    gameweekFixtures: Map<Team, string[]>
}

let fixtures = new Map<Team, string[]>();

function renderRow(poisitionPlayers: Player[], isStarting: boolean) {
    if (poisitionPlayers.length === 0) return;

    return (
        <Row key={poisitionPlayers[0].position}>
            {poisitionPlayers.map(player => (
                <Col className="" key={player.name}>
                    <SelectedPlayer player={player} opponents={fixtures.get(player.team)!} isStarting={isStarting} />
                </Col>
            ))}
        </Row>)
}

function LineupBoard({ gameweekFixtures }: LineupProps) {
    fixtures = gameweekFixtures;
    return (
        <div className={styles.Lineup}>
            <div className={styles.FieldBackground}>
                <div className={styles.Field}>
                    <div className={styles.StartingPlayersWrapper}>
                        <LineupContext.Consumer>
                            {lineup => lineup.getOutfieldPlayersByPosition().map(position => (
                                renderRow(position, true)
                            ))}
                        </LineupContext.Consumer>
                    </div>
                </div>
                <div className={styles.Bench}>
                    <LineupContext.Consumer>
                        {lineup => renderRow(lineup.bench, false)}
                    </LineupContext.Consumer>
                </div>
            </div>
        </div>
    )
}

export default LineupBoard;
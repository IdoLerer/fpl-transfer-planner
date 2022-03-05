import React, { useContext, Dispatch } from 'react';
import SelectedPlayer from '../SelectedPlayer/selected_player';
import styles from './styles.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Position, Team } from '../../Constants'
import Player from '../../Player';
import { loadGameweekFixtures } from '../../data_loader';
import { SelectionContext } from '../../contexts/Selection';
import { SelectionContextAction } from '../../contexts/Selection/reducer';
import { UserAction } from '../../contexts/Selection/SelectionState';

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
    const { state, dispatch } = useContext(SelectionContext);
    const lineup = state.lineup;

    return (
        <div className={styles.Lineup}>
            <div className={styles.FieldBackground}>
                <div className={styles.Field}>
                    <div className={styles.StartingPlayersWrapper}>
                        {lineup.getOutfieldPlayersByPosition().map(position => (
                            renderRow(position, true)
                        ))}
                    </div>
                </div>
                <div className={styles.Bench}>
                    {renderRow(lineup.bench, false)}
                </div>
            </div>
        </div>
    )
}

export default LineupBoard;
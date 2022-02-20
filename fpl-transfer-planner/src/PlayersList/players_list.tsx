import React from 'react';
import styles from './styles.module.css';
import ListGroup from 'react-bootstrap/ListGroup';
import { Position, Team } from '../Constants'
import Player from '../Player';
import Shirt from '../Shirt/shirt';

type PlayersListProps = {
    availablePlayers: Player[]
}

const renderPlayerItem = (player: Player) => {
    return (
        <ListGroup.Item key={player.id}>
            <div className="d-flex align-items-center">
                <div className={styles.ShirtWrapper}>
                    <Shirt team={player.team} position={player.position} width={'35'} />
                </div>
                <div className={styles.PlayerDetails}>
                    <div className={styles.PlayerName}>{player.name}</div>
                    {Team[player.team]}
                </div>
            </div>
        </ListGroup.Item >
    )
}

const PlayersList = ({ availablePlayers }: PlayersListProps) => {

    return (
        <div className={styles.PlayersList}>
            <ListGroup>
                {availablePlayers.map(renderPlayerItem)}
            </ListGroup>
        </div>
    )
}

export default PlayersList;
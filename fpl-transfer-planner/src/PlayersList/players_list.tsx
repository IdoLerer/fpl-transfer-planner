import React from 'react';
import styles from './styles.module.css';
import ListGroup from 'react-bootstrap/ListGroup';
import { Position } from '../Constants'
import Player from '../Player';

type PlayersListProps = {
    availablePlayers: Player[]
}

const renderPlayerItem = (player: Player) => {
    return (
        <ListGroup.Item key={player.id}>{player.name}</ListGroup.Item>
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
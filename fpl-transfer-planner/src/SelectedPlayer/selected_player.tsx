import React from 'react';
import styles from './styles.module.css';
import Player from '../Player';
import Shirt from '../Shirt/shirt';

type SelectedPlayerProps = {
    player: Player
    opponents: string[]
}

function SelectedPlayer({player, opponents}:SelectedPlayerProps) {
    const opponentsString = opponents.join(', ')
    return (
        <div className={`d-flex align-items-center flex-column ${styles.Player}`}>
            <Shirt team={player.team} position={player.position} width={'70'} />
            <div className={`${styles.PlayerName}`} >{player.name}</div>
            <div className={`${styles.Opponents}`} >{opponentsString}</div>
        </div>
    )

}

export default SelectedPlayer;
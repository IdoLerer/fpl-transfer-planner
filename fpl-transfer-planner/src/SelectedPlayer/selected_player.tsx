import React from 'react';
import styles from './styles.module.css';
import Player from '../Player';

type SelectedPlayerProps = {
    player: Player
}

function SelectedPlayer({player}:SelectedPlayerProps) {
    return (
        <div className={`p-3 d-flex align-items-center flex-column ${styles.Player}`}>
            <img className={styles.ShirtImage} src="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_43-66.webp" />
            <div className={`${styles.PlayerName}`} >{player.name}</div>
        </div>
    )

}

export default SelectedPlayer;
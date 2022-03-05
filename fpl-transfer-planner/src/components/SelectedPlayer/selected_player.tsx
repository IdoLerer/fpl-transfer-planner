import React, { useContext } from 'react';
import styles from './styles.module.css';
import Player from '../../Player';
import Shirt from '../Shirt/shirt';
import { SelectionState, UserAction } from '../../contexts/Selection/SelectionState';
import { SelectionContext } from '../../contexts/Selection';

type SelectedPlayerProps = {
    player: Player,
    opponents: string[],
    isStarting: boolean,
}

function isAvailableForSubstitution(selectionState: SelectionState, player: Player, isStarting: boolean) {
    const userAction = selectionState.userAction;
    const isInSubstitionDirection = (userAction == UserAction.SUBSTITUTING_BENCHED_PLAYER && isStarting) || (userAction == UserAction.SUBSTITUTING_STARTING_PLAYER && !isStarting);
    return isInSubstitionDirection && selectionState.legalSubPositions.includes(player.position);
}

function SelectedPlayer({ player, opponents, isStarting }: SelectedPlayerProps) {
    const opponentsString = opponents.join(', ');
    const { state, dispatch } = useContext(SelectionContext);
    let substitionClass = '';
    if (state.selectoionSate.substitutedPlayer === player) {
        substitionClass = 'bg-primary';
    } else if (isAvailableForSubstitution(state.selectoionSate, player, isStarting)) {
        substitionClass = 'bg-warning';
    }
    let userAction = UserAction.DEFAULT;
    if (state.selectoionSate.userAction === UserAction.DEFAULT) {
        userAction = isStarting ? UserAction.SUBSTITUTING_STARTING_PLAYER : UserAction.SUBSTITUTING_BENCHED_PLAYER;
    }

    return (

        <div className={styles.PlayerWrapper}>
            <div className={`d-flex align-items-center flex-column ${styles.Player} ${substitionClass}`} onClick={() => {
                dispatch!({ type: userAction, payload: player });
            }}>
                <Shirt team={player.team} position={player.position} width={'70'} />
                <div className={`${styles.PlayerName}`} >{player.name}</div>
                <div className={`${styles.Opponents}`} >{opponentsString}</div>
            </div>
        </div>
    )

}

export default SelectedPlayer;
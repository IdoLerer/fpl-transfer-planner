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
        substitionClass = 'bg-success';
    } else if (isAvailableForSubstitution(state.selectoionSate, player, isStarting)) {
        substitionClass = 'bg-secondary';
    }
    let userAction = UserAction.DEFAULT;
    if (state.selectoionSate.userAction === UserAction.DEFAULT) {
        userAction = isStarting ? UserAction.SUBSTITUTING_STARTING_PLAYER : UserAction.SUBSTITUTING_BENCHED_PLAYER;
    }

    return (

        <div className={`d-flex align-items-center flex-column ${styles.Player} ${substitionClass}`}>
            <Shirt team={player.team} position={player.position} width={'70'} />
            <div className={`${styles.PlayerName}`} >{player.name}</div>
            <div className={`${styles.Opponents}`} >{opponentsString}</div>
            <button onClick={() => {
                 dispatch!({ type: userAction, payload: player });
                 }}>
                Sub
            </button>
        </div>
    )

}

export default SelectedPlayer;
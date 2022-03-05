import React from 'react';
import styles from './styles.module.css';
import Player from '../Player';
import Shirt from '../Shirt/shirt';
import { SelectionContext } from '../App';
import { SelectionContextInterface, SelectionState } from '../SelectionContext';

type SelectedPlayerProps = {
    player: Player,
    opponents: string[],
    isStarting: boolean,
}

function isAvailableForSubstitution(selectionContext: SelectionContextInterface, player: Player, isStarting: boolean) {
    const selectionState = selectionContext.selectionState;
    const isInSubstitionDirection = (selectionState == SelectionState.SUBSTITUTING_BENCHED_PLAYER && isStarting) || (selectionState == SelectionState.SUBSTITUTING_STARTING_PLAYER && !isStarting);
    return isInSubstitionDirection && selectionContext.legalSubPositions.includes(player.position);
}

function SelectedPlayer({ player, opponents, isStarting }: SelectedPlayerProps) {
    const opponentsString = opponents.join(', ');
    
    return (
        <SelectionContext.Consumer>
            {selectionContext => {
                const substitionClass = isAvailableForSubstitution(selectionContext, player, isStarting) ? 'border border-primary' : '';
                return (
                    <div className={`d-flex align-items-center flex-column ${styles.Player} ${substitionClass}`}>
                        <Shirt team={player.team} position={player.position} width={'70'} />
                        <div className={`${styles.PlayerName}`} >{player.name}</div>
                        <div className={`${styles.Opponents}`} >{opponentsString}</div>
                    </div>
                )
            }}
        </SelectionContext.Consumer>
    )

}

export default SelectedPlayer;
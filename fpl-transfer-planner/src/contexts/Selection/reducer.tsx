import { Position } from "../../Constants"
import Player from "../../Player"
import { Lineup } from "./Lineup"
import { initialSelectionState, SelectionState, UserAction } from "./SelectionState"

export type SelectionContextState = {
    lineup: Lineup,
    selectoionSate: SelectionState
}

export type SelectionContextAction = {
    type: UserAction,
    payload: Player
}

export type SelectionContextType = {
    state: SelectionContextState,
    dispatch?: React.Dispatch<SelectionContextAction>
}

export const selectionContextReducer = (state: SelectionContextState, action: SelectionContextAction) => {
    const player = action.payload;
    const userAction = action.type;
    let legalSubPositions;
    switch (userAction) {
        case UserAction.SUBSTITUTING_STARTING_PLAYER:
            legalSubPositions = state.lineup.getLegalPositionsForSwitch(player.position, true);
            break;
        case UserAction.SUBSTITUTING_BENCHED_PLAYER:
            legalSubPositions = state.lineup.getLegalPositionsForSwitch(player.position, false);
            break;
        case UserAction.DEFAULT:
        default:
            return { ...state, selectoionSate: initialSelectionState };
    }
    const newSelectionState: SelectionState = { userAction, legalSubPositions, substitutedPlayer: player };
    const newState: SelectionContextState = { ...state, selectoionSate: newSelectionState }
    return newState;
}

export const initialSelectionContext: SelectionContextState = {
    lineup: new Lineup(),
    selectoionSate: initialSelectionState
}
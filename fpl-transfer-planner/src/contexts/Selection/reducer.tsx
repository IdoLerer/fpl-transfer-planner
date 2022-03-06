import { Position } from "../../Constants"
import Player from "../../Player"
import { Lineup } from "./Lineup"
import { initialSelectionState, SelectionState, UserAction } from "./SelectionState"

export type SelectionContextState = {
    lineup: Lineup,
    selectoionSate: SelectionState
}

export enum SelectionActionType {
    DEFAULT = "DEFAULT",
    START_SUBSTITUTION = "START_SUBSTITUTION",
    MAKE_SUBSTITUTION = "MAKE_SUBSTITUTION",
}

export type SelectionContextAction = {
    type: SelectionActionType,
    payload: { player: Player, userAction: UserAction }
}

export type SelectionContextType = {
    state: SelectionContextState,
    dispatch?: React.Dispatch<SelectionContextAction>
}

export const selectionContextReducer = (state: SelectionContextState, action: SelectionContextAction) => {
    const { userAction, player } = action.payload;
    const selectionActionType = action.type;
    let legalSubPositions;
    switch (selectionActionType) {
        case SelectionActionType.START_SUBSTITUTION:
            const isStarting = userAction === UserAction.SUBSTITUTING_STARTING_PLAYER;
            legalSubPositions = state.lineup.getLegalPositionsForSwitch(player.position, isStarting);
            const newSelectionState: SelectionState = { userAction, legalSubPositions, substitutedPlayer: player };
            const newState: SelectionContextState = { ...state, selectoionSate: newSelectionState }
            return newState;
        case SelectionActionType.MAKE_SUBSTITUTION:
            state.lineup.makeSubstitution(state.selectoionSate.substitutedPlayer!, player);
            return { ...state, selectoionSate: initialSelectionState };
        case SelectionActionType.DEFAULT:
        default:
            return { ...state, selectoionSate: initialSelectionState };
    }
}

export const initialSelectionContext: SelectionContextState = {
    lineup: new Lineup(),
    selectoionSate: initialSelectionState
}
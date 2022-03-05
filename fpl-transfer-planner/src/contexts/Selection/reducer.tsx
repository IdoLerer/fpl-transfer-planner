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
    payload: Position
}

export type SelectionContextType = {
    state: SelectionContextState,
    dispatch?: React.Dispatch<SelectionContextAction>
}

export const selectionContextReducer = (state: SelectionContextState, action: SelectionContextAction) => {
    const { type, payload } = action; 
    const userAction = type;
    const legalSubPositions = state.lineup.getLegalPositionsForSwitch(payload, type);
    const newSelectionState: SelectionState = {userAction, legalSubPositions};
    const newState: SelectionContextState = {...state, selectoionSate: newSelectionState}
    return newState;
}

export const initialSelectionContext: SelectionContextState = {
    lineup: new Lineup(),
    selectoionSate: initialSelectionState
}
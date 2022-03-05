import { Position } from "./Constants";

export enum SelectionState {
    DEFAULT,
    SUBSTITUTING_STARTING_PLAYER,
    SUBSTITUTING_BENCHED_PLAYER,
}

export interface SelectionContextInterface {
    selectionState: SelectionState;
    legalSubPositions: Position[];
}

export const defaultSelectionContext: SelectionContextInterface = {
    selectionState: SelectionState.DEFAULT,
    legalSubPositions: [],
}
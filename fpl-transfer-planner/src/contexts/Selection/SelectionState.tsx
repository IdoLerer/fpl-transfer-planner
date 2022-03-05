import { Position } from "../../Constants";

export enum UserAction {
    DEFAULT = 'DEFAULT',
    SUBSTITUTING_STARTING_PLAYER = 'SUBSTITUTING_STARTING_PLAYER',
    SUBSTITUTING_BENCHED_PLAYER = 'SUBSTITUTING_BENCHED_PLAYER',
}

export interface SelectionState {
    userAction: UserAction;
    legalSubPositions: Position[];
}

export const initialSelectionState = {
    userAction: UserAction.DEFAULT,
    legalSubPositions: []
}
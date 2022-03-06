import { Position } from "../../Constants";
import Player from "../../Player";

export enum UserAction {
    DEFAULT,
    SUBSTITUTING_STARTING_PLAYER,
    SUBSTITUTING_BENCHED_PLAYER ,
}

export interface SelectionState {
    userAction: UserAction;
    legalSubPositions: Position[];
    substitutedPlayer?: Player;
}

export const initialSelectionState = {
    userAction: UserAction.DEFAULT,
    legalSubPositions: []
}
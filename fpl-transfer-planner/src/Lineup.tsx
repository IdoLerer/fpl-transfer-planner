import { createContext } from "react";
import { Position } from "./Constants";
import Player from "./Player";

export class Lineup {
    goalkeepers: Player[] = [];
    defenders: Player[] = [];
    midfielders: Player[] = [];
    forwards: Player[] = [];
    bench: Player[] = [];

    setBench(benchPlayers: Player[]) {
        this.bench = benchPlayers;
    }

    fillPlayerPositions(startingPlayers: Player[]){
        for (const startingPlayer of startingPlayers) {
            switch (startingPlayer.position) {
                case Position.GK:
                    this.goalkeepers.push(startingPlayer);
                    continue;
                case Position.DEF:
                    this.defenders.push(startingPlayer);
                    continue;
                case Position.MID:
                    this.midfielders.push(startingPlayer);
                    continue;
                case Position.FWD:
                    this.forwards.push(startingPlayer);
                    continue;
                default:
            }
        }
    }

    getOutfieldPlayersByPosition() {
        return [this.goalkeepers, this.defenders, this.midfielders, this.forwards];
    }

    getLegalPositionsForSwitch(positionSwitched: Position) {
        const outfieldPositions = [Position.DEF, Position.MID, Position.FWD];
        switch (positionSwitched) {
            case Position.GK:
                return [Position.GK];

            case Position.DEF:
                return this.defenders.length > 3 ? outfieldPositions : [Position.DEF];

            case Position.MID:
                return this.midfielders.length > 3 ? outfieldPositions : [Position.MID];

            case Position.FWD:
                return this.forwards.length > 1 ? outfieldPositions : [Position.FWD];
    
            default:
                throw new Error("Impossible position");
        }
    }
}
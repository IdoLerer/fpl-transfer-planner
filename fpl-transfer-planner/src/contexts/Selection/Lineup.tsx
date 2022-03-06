import { createContext } from "react";
import { Position } from "../../Constants";
import Player from "../../Player";
import { UserAction } from "./SelectionState";

export class Lineup {
    goalkeepers: Set<Player> = new Set();
    defenders: Set<Player> = new Set();
    midfielders: Set<Player> = new Set();
    forwards: Set<Player> = new Set();
    bench: Set<Player> = new Set();

    setBench(benchPlayers: Player[]) {
        this.bench = new Set(benchPlayers);
    }

    fillPlayerPositions(startingPlayers: Player[]) {
        for (const startingPlayer of startingPlayers) {
            switch (startingPlayer.position) {
                case Position.GK:
                    this.goalkeepers.add(startingPlayer);
                    continue;
                case Position.DEF:
                    this.defenders.add(startingPlayer);
                    continue;
                case Position.MID:
                    this.midfielders.add(startingPlayer);
                    continue;
                case Position.FWD:
                    this.forwards.add(startingPlayer);
                    continue;
                default:
            }
        }
    }

    getOutfieldPlayersByPosition() {
        return [this.goalkeepers, this.defenders, this.midfielders, this.forwards];
    }

    getLegalPositionsForSwitch(positionSwitched: Position, isStarting: boolean) {
        if (positionSwitched === Position.GK) return [Position.GK];
        const outfieldPositions = [Position.DEF, Position.MID, Position.FWD];
        if (isStarting) {
            switch (positionSwitched) {
                case Position.DEF:
                    return this.defenders.size > 3 ? outfieldPositions : [Position.DEF];

                case Position.MID:
                    return this.midfielders.size > 3 ? outfieldPositions : [Position.MID];

                case Position.FWD:
                    return this.forwards.size > 1 ? outfieldPositions : [Position.FWD];

                default:
                    throw new Error("Impossible position");
            }
        } else {
            const possiblePositionsToRemove = new Set<Position>();
            if (this.defenders.size > 3) possiblePositionsToRemove.add(Position.DEF);
            if (this.midfielders.size > 3) possiblePositionsToRemove.add(Position.MID);
            if (this.forwards.size > 1) possiblePositionsToRemove.add(Position.FWD);
            possiblePositionsToRemove.add(positionSwitched);
            return Array.from(possiblePositionsToRemove);
        }
    }

    makeSubstitution(playerA: Player, playerB: Player) {
        const benchPlayer = this.bench.has(playerA) ? playerA : playerB;
        const startingPlayer = this.bench.has(playerA) ? playerB : playerA;
        this.bench.delete(benchPlayer);
        this.bench.add(startingPlayer);
        switch (benchPlayer.position) {
            case Position.DEF:
                this.defenders.add(benchPlayer);
                break;
            case Position.MID:
                this.midfielders.add(benchPlayer);
                break;
            case Position.FWD:
                this.forwards.add(benchPlayer);
                break;
            case Position.GK:
                this.goalkeepers.add(benchPlayer);
                break;
            default:
                throw new Error("Impossible position");
        }
        switch (startingPlayer.position) {
            case Position.DEF:
                this.defenders.delete(startingPlayer);
                return;
            case Position.MID:
                this.midfielders.delete(startingPlayer);
                return;
            case Position.FWD:
                this.forwards.delete(startingPlayer);
                return;
            case Position.GK:
                this.goalkeepers.delete(startingPlayer);
                return;
            default:
                throw new Error("Impossible position");
        }
    }

    copy() {
        const copiedLineup = new Lineup();
        copiedLineup.bench = new Set(this.bench);
        copiedLineup.goalkeepers = new Set(this.goalkeepers);
        copiedLineup.defenders  = new Set(this.defenders);
        copiedLineup.midfielders = new Set(this.midfielders);
        copiedLineup.forwards = new Set(this.forwards);
        return copiedLineup;
    }
}
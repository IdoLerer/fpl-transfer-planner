import {Team, Position} from './Constants'

class Player {
    public readonly id: string
    public readonly name: string;
    public readonly cost: number;
    public readonly position: Position;
    public readonly team: Team;
    public readonly totalPoints: number;
    constructor(id: string, name: string, cost: number, position: Position, team: Team, totalPoints: number) { 
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.position = position;
        this.team = team;
        this.totalPoints = totalPoints;
    }
}

export default Player;
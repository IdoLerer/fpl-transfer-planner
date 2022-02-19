import {Team, Position} from './Constants'

class Player {
    public readonly id: string
    public readonly name: string;
    public readonly cost: number;
    public readonly position: Position;
    public readonly team: Team;
    constructor(id: string, name: string, cost: number, position: Position, team: Team) { 
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.position = position;
        this.team = team;
    }
}

export default Player;
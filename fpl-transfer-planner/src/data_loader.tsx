import Player from './Player';

export const loadAllPlayers = async () => {
    const response = await fetch("/api/allplayers")
        .then(res => res.json());
    const players = [];
    for (const playerData of response.players) {
        players.push(new Player(playerData.id, playerData.name, playerData.cost, playerData.position, playerData.team))
    }
    return players;
}

export const loadManagerGameweek = async () => {
    const response = await fetch("/api/managerGameweek/22422/25")
        .then(res => res.json());
    return response.picks;
}
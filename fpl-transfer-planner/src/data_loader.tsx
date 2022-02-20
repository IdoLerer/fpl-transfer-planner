import Player from './Player';
import { Team } from './Constants';

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

export const loadGameweekFixtures = async () => {
    const response = await fetch("/api/gameweek/26")
        .then(res => res.json());
    const fixturesMap = new Map();
    for (const fixture of response) {
        const homeTeamOppennts: string[] = fixturesMap.get(fixture[0]) || [];
        homeTeamOppennts.push(`${Team[fixture[1]]} (H)`)
        fixturesMap.set(fixture[0], homeTeamOppennts)
        const awayTeamOppennts: string[] = fixturesMap.get(fixture[1]) || [];
        awayTeamOppennts.push(`${Team[fixture[0]]} (A)`)
        fixturesMap.set(fixture[1], awayTeamOppennts)
    }
    return fixturesMap;
}
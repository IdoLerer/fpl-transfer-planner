import { BootstrapData, FixtureData, ManagerGameweekData, PickData } from './fpl_api_types';
import { Player } from './fpl_api_types';
import fetch from 'node-fetch';

// TODO: Implement a dedicated cache or database
let bootstrapData: BootstrapData | null = null;
let allPlayers: null | Player[] = null;
let managerGameweek: null | ManagerGameweekData = null;
let gmeweekFixturesData: null | FixtureData[] = null;

const fetchBootstrapData = async (): Promise<BootstrapData> => {
    if (!bootstrapData) {
        bootstrapData = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/")
            .then(res => res.json());
    }
    return bootstrapData!;
}

export const fetchAllPlayers = async () => {
    if (allPlayers) return allPlayers;
    const bootstrapData = await fetchBootstrapData();
    allPlayers = [];
    const playerData = bootstrapData.elements[0];
    for (const playerData of bootstrapData.elements) {
        allPlayers.push({ id: playerData.id, name: playerData.web_name, cost: playerData.now_cost, position: playerData.element_type, team: playerData.team, totalPoints: playerData.total_points })
    }
    return allPlayers;
}

export const fetchManagerGameweek = async (managerId: string, gameweek: string) => {
    if (!managerGameweek) {
        managerGameweek = await fetch(`https://fantasy.premierleague.com/api/entry/${managerId}/event/${gameweek}/picks/`)
            .then(res => res.json());
    }
    const picks = managerGameweek!.picks as PickData[];
    const startingPlayersIds = [];
    const benchPlayersIds = [];
    for (const pick of picks) {
        if (pick.multiplier === 0) {
            benchPlayersIds.push(pick.element);
        } else {
            startingPlayersIds.push(pick.element);
        }
    }
    return {startingPlayersIds, benchPlayersIds};
}

export const fetchGameweekFixtures = async (gameweek: string) => {
    if (!gmeweekFixturesData) {
        gmeweekFixturesData = await fetch(`https://fantasy.premierleague.com/api/fixtures/?event=${gameweek}`)
            .then(res => res.json()) as FixtureData[];
    }
    const gameWeekFixtures = [];
    for (const fixtureData of gmeweekFixturesData) {
        gameWeekFixtures.push([fixtureData.team_h, fixtureData.team_a]);
    }
    return gameWeekFixtures;
}
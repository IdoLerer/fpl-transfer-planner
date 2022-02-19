import { BootstrapData, ManagerGameweekData, PickData } from './fpl_api_types';
import { Player } from './fpl_api_types';
import fetch from 'node-fetch';

// TODO: Implement a dedicated cache or database
let bootstrapData: BootstrapData | null = null;
let allPlayers: null | Player[] = null;
let managerGameweek: null | ManagerGameweekData = null;

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
        allPlayers.push({ id: playerData.id, name: playerData.web_name, cost: playerData.now_cost, position: playerData.element_type, team: playerData.team })
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
            benchPlayersIds.push(pick.element)
        } else {
            startingPlayersIds.push(pick.element);
        }
    }
    return {startingPlayersIds, benchPlayersIds};
}
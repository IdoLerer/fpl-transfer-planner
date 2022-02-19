export type BootstrapData = {
    events: Object[];
    teams: Object[];
    elements: PlayerData[];
}

export type PlayerData = {
    id: number;
    web_name: string;
    now_cost: number;
    team: number;
    element_type: number;
}

export type PickData = {
    element: number;
    position: number;
    multiplier: number;
    is_captain: boolean;
    is_vice_captain: boolean;
}

export type ManagerGameweekData = {
    bank: number;
    picks: PickData[];
}

export type Player = {
    id: number;
    name: string;
    cost: number;
    position: number;
    team: number;
}
import React from 'react';
import { Position, Team } from '../../Constants';

type ShirtProps = {
    team: Team;
    position: Position;
    width: string;
}

function Shirt({team, position, width}:ShirtProps) {
    const teamPrefix = Team[team].toLowerCase();
    const positionSuffix = position === Position.GK ? '_gk' : '';
    return <img src={process.env.PUBLIC_URL + `/img/shirts/${teamPrefix}${positionSuffix}.webp`} alt='Player shirt' width={width}/>;
}

export default Shirt;
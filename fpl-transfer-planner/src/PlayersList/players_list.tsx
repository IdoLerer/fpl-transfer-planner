import React, { useState } from 'react';
import styles from './styles.module.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table'
import { Position, Team } from '../Constants'
import Player from '../Player';
import Shirt from '../Shirt/shirt';

type PlayersListProps = {
    availablePlayers: Player[]
}

const renderPlayerItem = (player: Player) => {
    return (
        <tr key={player.id}>
            <td>
                <div className={`${styles.ShirtWrapper} align-middle`}>
                    <Shirt team={player.team} position={player.position} width={'35'} />
                </div>
                <div className={`${styles.PlayerDetails} align-middle`}>
                    <div className={styles.PlayerName}>{player.name}</div>
                    {Team[player.team]}
                </div>
            </td>
            <td className='align-middle'>{`£${(player.cost/10).toFixed(1)}m`}</td>
            <td className='align-middle'>{player.id}</td>
        </tr>
    )
}

const PlayersList = ({ availablePlayers }: PlayersListProps) => {
    const [nameFilter, setNameFilter] = useState('');

    return (
        <>
            <input
                type="text"
                value={nameFilter}
                onChange={e => setNameFilter(e.target.value.toLowerCase())} />
            <div className={styles.PlayersList}>
                <Table hover  size='sm'>
                    <thead >
                        <tr>
                            <th  className='position-sticky  text-white'>Player</th>
                            <th  className='position-sticky  text-white'>£</th>
                            <th  className='position-sticky  text-white'>Points</th>
                        </tr>
                    </thead>
                    <tbody className='border-top-0'>
                        {availablePlayers.filter(player => player.name.toLowerCase().includes(nameFilter)).sort((playerA, playerB) => playerB.cost - playerA.cost).map(renderPlayerItem)}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default PlayersList;
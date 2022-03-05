import React, { useState, useMemo } from 'react';
import styles from './styles.module.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table'
import { Position, Team } from '../../Constants'
import Player from '../../Player';
import Shirt from '../Shirt/shirt';

type PlayersListProps = {
    availablePlayers: Player[]
}

type SortableProperty = 'cost' | 'totalPoints';

type SortConfig = {
    key: SortableProperty
    ascending: boolean
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
            <td className='align-middle'>{`£${(player.cost / 10).toFixed(1)}m`}</td>
            <td className='align-middle'>{player.totalPoints}</td>
        </tr>
    )
}

const PlayersList = ({ availablePlayers }: PlayersListProps) => {
    const [nameFilter, setNameFilter] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "cost", ascending: false });

    const setSort = (key: SortableProperty) => {
        const ascending = sortConfig.key === key ? !sortConfig.ascending : false;
        setSortConfig({ key, ascending });
    }

    const playerSort = (a: Player, b: Player) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.ascending ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.ascending ? 1 : -1;
        }
        return 0;
    }

    const players = useMemo(() => {
        let sortedPlayers = [...availablePlayers];
        return sortedPlayers.filter(player => player.name.toLowerCase().includes(nameFilter)).sort(playerSort);
    }, [availablePlayers, nameFilter, sortConfig]);

    const getClassNamesFor = (name: SortableProperty) => {
        return sortConfig.key === name ? sortConfig.ascending ? styles.Ascending : styles.Descending : undefined;
    };

    return (
        <>
            <input
                type="text"
                value={nameFilter}
                onChange={e => setNameFilter(e.target.value.toLowerCase())} />
            <div className={styles.PlayersList}>
                <Table hover size='sm'>
                    <thead >
                        <tr>
                            <th className='position-sticky text-white'>Player</th>
                            <th className={`position-sticky ${getClassNamesFor('cost')}`}>
                                <button type="button" className={`text-white ${styles.PropertyButton}`} onClick={() => setSort('cost')}>£</button>
                            </th>
                            <th className={`position-sticky text-white ${getClassNamesFor('totalPoints')}`}>
                                <button type="button" className={`text-white ${styles.PropertyButton}`} onClick={() => setSort('totalPoints')}>Points</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='border-top-0'>
                        {players.map(renderPlayerItem)}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default PlayersList;
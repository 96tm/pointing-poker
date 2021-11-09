import React from 'react';
import { IUser, TUserRole } from '../../../redux/types';
import PlayerCard from '../../shared/player-card/player-card';
import styles from './players-list.module.scss';

interface IPlayersProps {
  players: IUser[];
}

export default function PlayersList({ players }: IPlayersProps): JSX.Element {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Members:</h2>
      <div className={styles.playersContainer}>
        {players.map((player) => {
          return (
            player.role !== TUserRole.dealer && (
              <PlayerCard key={player.id} user={player} />
            )
          );
        })}
      </div>
    </div>
  );
}

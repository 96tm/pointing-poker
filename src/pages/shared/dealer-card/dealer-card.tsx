import styles from './dealer-card.module.scss';
import React from 'react';
import { IUser } from '../../../redux/types';
import PlayerCard from '../player-card/player-card';

interface IDealerCardProps {
  dealer: IUser;
}

export default function DealerCard({ dealer }: IDealerCardProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.role}>Scrum master:</div>
      <PlayerCard user={dealer} />
    </div>
  );
}

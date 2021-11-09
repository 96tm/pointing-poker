import React from 'react';
import { IUser } from '../../../../redux/types';
import styles from './avatar.module.scss';

function getInitials(firstName: string, lastName?: string): string {
  return firstName[0] + (lastName?.[0] || '');
}

interface IAvatarProps {
  player: IUser;
}

export default function Avatar({ player }: IAvatarProps): JSX.Element {
  return player?.image ? (
    <img className={styles.img} src={player?.image}></img>
  ) : (
    <div className={styles.avatar}>
      {getInitials(player.firstName, player?.lastName)}
    </div>
  );
}

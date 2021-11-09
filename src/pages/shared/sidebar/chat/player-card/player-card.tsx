import React from 'react';
import { TUserRole } from '../../../../../redux/types';
import BasePlayerCard, {
  IPlayerCardProps,
} from '../../../player-card/player-card';
import styles from './player-card.module.scss';

const PlayerCard = ({ customClass, user }: IPlayerCardProps): JSX.Element => {
  return (
    <BasePlayerCard
      user={user}
      customClass={`${customClass} ${
        user.role === TUserRole.dealer ? styles.cardHighlight : ''
      }`}
    />
  );
};

export default PlayerCard;

import styles from './round-status.module.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  gameSelectors,
  gameSettingsSelectors,
} from '../../../../redux/selectors';
import PlayerCard from '../../player-card/player-card';
import { IUser, TGameStatus, TUserRole } from '../../../../redux/types';

export default function RoundStatus(): JSX.Element {
  const players = useSelector(gameSelectors.selectPlayers);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const scores = useSelector(gameSelectors.selectCurrentIssue)?.lastRoundResult;

  const getPlayerStatus = (player: IUser): string => {
    if (
      (player.role === TUserRole.dealer && gameSettings.canDealerPlay) ||
      player.role === TUserRole.player
    ) {
      if (scores?.[player.id]) {
        return String(scores[player.id]);
      }
      return gameStatus === TGameStatus.started ? 'Idle' : 'In progress';
    }
    return 'Observer';
  };

  return (
    <div className={styles.roundStatus}>
      <div className={styles.scoreItemWide}>
        <div className={styles.heading}>Scores:</div>
        <div className={styles.heading}>Players:</div>
      </div>
      <div className={styles.scoreItemNarrow}>
        <div className={styles.heading}>Scores/players:</div>
      </div>

      {players.map((player) => {
        return (
          <div className={styles.scoreItem} key={player.id}>
            <div className={styles.status}>{getPlayerStatus(player)}</div>
            <PlayerCard user={player} customClass={styles.playerCard} />
          </div>
        );
      })}
    </div>
  );
}

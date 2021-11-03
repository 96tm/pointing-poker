import React from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../../redux/selectors';
import { TGameStatus } from '../../../redux/types';
import Chat from './chat/chat';
import RoundStatus from './round-status/round-status';
import styles from './sidebar.module.scss';

export default function Sidebar(): JSX.Element {
  const gameStatus = useSelector(gameSelectors.selectStatus);

  return (
    <aside className={styles.container}>
      {gameStatus === TGameStatus.lobby ? <Chat /> : <RoundStatus />}
    </aside>
  );
}

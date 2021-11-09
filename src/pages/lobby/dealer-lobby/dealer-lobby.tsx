import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  currentUserSelectors,
  gameSelectors,
  gameSettingsSelectors,
  lobbyPageSelectors,
} from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import { cancelGameThunk, startGameThunk } from '../../../redux/thunks';
import { IRequestResult, TGameStatus } from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import { APP_CONSTANTS } from '../../../shared/constants';
import { gameService } from '../../../shared/services/game-service/game-service';
import { BaseButton } from '../../shared/buttons/base-button/base-button';
import { ButtonBlue } from '../../shared/buttons/button-blue/button-blue';
import Sidebar from '../../shared/sidebar/sidebar';
import SprintHeading from '../../shared/sprint-heading/sprint-heading';
import AboutDealer from '../about-dealer/about-dealer';
import Settings from './settings/settings';
import GameInfo from './game-info/game-info';
import IssuesList from './issues-list/issues-list';
import PlayersList from '../players-list/players-list';
import styles from './dealer-lobby.module.scss';

export default function DealerLobby(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const isSideBarShown = useSelector(lobbyPageSelectors.selectIsSideBarShown);
  const users = useSelector(gameSelectors.selectPlayers);
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(currentUserSelectors.selectCurrentUser);
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const gameId = useSelector(gameSelectors.selectGame).id;
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const [gameURL] = useState(`${APP_CONSTANTS.URL}/lobby/${gameId}`);

  useEffect(() => {
    if (gameStatus === TGameStatus.inactive) {
      history.replace('/');
      gameService.resetState();
    } else if (gameStatus === TGameStatus.started) {
      history.replace(`/game/${gameId}`);
    } else if (gameStatus !== TGameStatus.lobby) {
      history.replace('/');
      gameService.resetState();
    }
  }, [gameStatus]);

  const handleCancel = async () => {
    const response = await dispatch(
      cancelGameThunk({ dealerId: dealer.id, gameId })
    );
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  const handleStart = async () => {
    const response = await dispatch(
      startGameThunk({
        settings: gameSettings,
        gameId,
        dealerId: dealer.id,
      })
    );
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  return gameStatus !== TGameStatus.inactive ? (
    <div className={styles.container}>
      <div
        className={`${styles.content} ${
          isSideBarShown ? styles.contentWithSidebar : ''
        }`}
      >
        <div className={styles.titleSprint}>
          <SprintHeading issues={issues} />
        </div>
        <AboutDealer />
        <GameInfo gameURL={gameURL} />
        <div className={styles.btnGameContainer}>
          <ButtonBlue className={styles.btnStart} onClick={handleStart}>
            Start Game
          </ButtonBlue>
          <BaseButton className={styles.btnCancel} onClick={handleCancel}>
            Cancel game
          </BaseButton>
        </div>
        <PlayersList players={users} />
        <IssuesList />
        <div className={styles.containerSettings}>
          <div className={styles.titleSettings}>Game settings:</div>
          <Settings />
        </div>
      </div>
      {isSideBarShown && <Sidebar />}
    </div>
  ) : (
    <div />
  );
}

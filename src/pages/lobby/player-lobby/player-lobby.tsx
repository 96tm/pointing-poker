import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  currentUserSelectors,
  gameSelectors,
  votingKickSelectors,
} from '../../../redux/selectors';
import { lobbyPageSelectors } from '../../../redux/selectors/lobby-page-selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import { leaveGameThunk } from '../../../redux/thunks';
import { IRequestResult, TGameStatus } from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import { gameService } from '../../../shared/services/game-service/game-service';
import { ButtonBlue } from '../../shared/buttons/button-blue/button-blue';
import Sidebar from '../../shared/sidebar/sidebar';
import SprintHeading from '../../shared/sprint-heading/sprint-heading';
import AboutDealer from '../about-dealer/about-dealer';
import KickPlayerPopup from '../dealer-lobby/kickPlayerPopup/kick-player-popup';
import PlayersList from '../players-list/players-list';
import styles from './player-lobby.module.scss';

export default function PlayerLobby(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [isVotingPopupShown, setIsVotingPopupShown] = useState(false);
  const isSideBarShown = useSelector(lobbyPageSelectors.selectIsSideBarShown);
  const users = useSelector(gameSelectors.selectPlayers);
  const issues = useSelector(gameSelectors.selectIssues);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const gameId = useSelector(gameSelectors.selectId);
  const votingKick = useSelector(votingKickSelectors.selectVotingKick);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const playerToKick = users.find(
    (user) => user.id === votingKick.kickedPlayerId
  );

  useEffect(() => {
    if (gameStatus === TGameStatus.started) {
      history.replace(`/game/${gameId}`);
    } else if (gameStatus !== TGameStatus.lobby) {
      history.replace('/');
      gameService.resetState();
    }
  }, [gameStatus]);

  useEffect(() => {
    if (votingKick.kickedPlayerId) {
      setIsVotingPopupShown(true);
    }
  }, [votingKick.kickedPlayerId]);

  const handleExit = async () => {
    const response = await dispatch(
      leaveGameThunk({ playerId: currentUser.id, gameId })
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

  return gameStatus === TGameStatus.lobby ? (
    <div className={styles.container}>
      <div
        className={`${styles.content} ${
          isSideBarShown ? styles.contentWithSidebar : ''
        }`}
      >
        <KickPlayerPopup
          setIsVotingPopupShown={setIsVotingPopupShown}
          isShown={isVotingPopupShown}
          playerToKick={playerToKick}
        />
        <div className={styles.titleSprint}>
          <SprintHeading issues={issues} />
        </div>

        <AboutDealer />

        <div className={styles.btnExitContainer}>
          <ButtonBlue
            type="button"
            className={styles.btnExit}
            onClick={handleExit}
          >
            Exit
          </ButtonBlue>
        </div>
        <PlayersList players={users} />
      </div>
      {isSideBarShown && <Sidebar />}
    </div>
  ) : (
    <div />
  );
}

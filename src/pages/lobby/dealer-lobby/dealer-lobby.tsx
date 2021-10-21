import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
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
import { thunks } from '../../../redux/thunks/thunks';
import { IRequestResult, TGameStatus } from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import { APP_CONSTANTS } from '../../../shared/constants';
import { gameService } from '../../../shared/services/game-service/game-service';
import { BaseButton } from '../../shared/buttons/base-button/base-button';
import { ButtonBlue } from '../../shared/buttons/button-blue/button-blue';
import SideBar from '../../shared/side-bar/side-bar';
import SprintHeading from '../../shared/sprint-heading/sprint-heading';
import AboutDealer from '../about-dealer/about-dealer';
import CreateIssueCard from '../card-create-issue/card-create-issue';
import Members from '../members/members';
import styles from './dealer-lobby.module.scss';
import IssueCard from './issue-card/issue-card';
import Settings from './settings/settings';

const DealerLobby = (): JSX.Element => {
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
      thunks.cancelGameThunk({ dealerId: dealer.id, gameId })
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
      thunks.startGameThunk({
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
        <div className={styles.containerLinkToLobby}>
          <h4 className={styles.titleLinkTo}>Link to lobby:</h4>
          <div className="form">
            <Form>
              <Form.Group>
                <Form.Control
                  type="url"
                  className={styles.input}
                  value={gameURL}
                  readOnly={true}
                />
                <ButtonBlue
                  type="button"
                  className={styles.btnCopy}
                  onClick={() =>
                    globalThis.navigator.clipboard.writeText(gameURL)
                  }
                >
                  Copy
                </ButtonBlue>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className={styles.btnGameContainer}>
          <ButtonBlue className={styles.btnStart} onClick={handleStart}>
            Start Game
          </ButtonBlue>
          <BaseButton className={styles.btnCancel} onClick={handleCancel}>
            Cancel game
          </BaseButton>
        </div>
        <Members users={users} />
        <div className={styles.issuesContainer}>
          <h2 className={styles.titleIssues}>Issues:</h2>
          <div className={styles.wrapperIssue}>
            {issues.map((item) => {
              return (
                <div className={styles.card} key={item.id}>
                  <IssueCard infoIssue={item} />
                </div>
              );
            })}
            <CreateIssueCard />
          </div>
        </div>
        <div className={styles.containerSettings}>
          <div className={styles.titleSettings}>Game settings:</div>
          <Settings />
        </div>
      </div>
      {isSideBarShown && <SideBar />}
    </div>
  ) : (
    <div />
  );
};

export default DealerLobby;

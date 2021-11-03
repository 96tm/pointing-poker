import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSelectors,
  gameSettingsSelectors,
} from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { gameActions } from '../../../redux/slices/game/game-slice';
import { AppDispatch } from '../../../redux/store';
import { thunks } from '../../../redux/thunks/thunks';
import { IRequestResult, TGameStatus, TUserRole } from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import { BaseButton } from '../../shared/buttons/base-button/base-button';
import { ButtonBlue } from '../../shared/buttons/button-blue/button-blue';
import Timer from '../timer/timer';
import styles from './game-controls.module.scss';

interface IGameControlsProps {
  setIsGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GameControls({
  setIsGameFinished,
}: IGameControlsProps): JSX.Element {
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const gameId = useSelector(gameSelectors.selectId);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const currentIssue = useSelector(gameSelectors.selectCurrentIssue);
  const settings = useSelector(gameSettingsSelectors.selectSettings);
  const issues = useSelector(gameSelectors.selectIssues);
  const dispatch = useDispatch<AppDispatch>();

  const handleExit = async () => {
    const response = await dispatch(
      thunks.leaveGameThunk({ playerId: currentUser.id, gameId })
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

  const handleNextIssue = async () => {
    dispatch(
      thunks.getNextIssueThunk({
        dealerId: currentUser.id,
        gameId,
      })
    );
  };

  const handleStart = async () => {
    if (currentIssue) {
      const response = await dispatch(
        thunks.startRoundThunk({
          dealerId: currentUser.id,
          issueId: currentIssue.id,
          gameId,
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
    }
  };

  const handleRestart = async () => {
    if (currentIssue) {
      const response = dispatch(
        gameActions.updateIssue({
          issueId: currentIssue.id,
          updatedIssue: { lastRoundResult: {} },
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
      handleStart();
    }
  };

  const handleFinishRound = async () => {
    const response = await dispatch(
      thunks.finishRoundThunk({ dealerId: currentUser.id, gameId })
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

  const handleCancelGame = async () => {
    const response = await dispatch(
      thunks.cancelGameThunk({ dealerId: currentUser.id, gameId })
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

  const handleFinishGame = async () => {
    setIsGameFinished(true);
    const response = await dispatch(
      thunks.finishGameThunk({ dealerId: currentUser.id, gameId })
    );
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      setIsGameFinished(false);
      return;
    }
  };

  return (
    <div className={styles.gameControls}>
      {settings.timer && <Timer />}
      <div className={styles.buttons}>
        {currentUser.role === TUserRole.dealer ? (
          <>
            <div className={styles.gameButtons}>
              <BaseButton
                disabled={gameStatus !== TGameStatus.started}
                className={styles.button}
                onClick={handleCancelGame}
              >
                Stop Game
              </BaseButton>
              <BaseButton
                disabled={gameStatus !== TGameStatus.started}
                className={styles.button}
                onClick={handleFinishGame}
              >
                Finish Game
              </BaseButton>
            </div>
            <div className={styles.roundButtons}>
              {currentIssue &&
                Object.keys(currentIssue.lastRoundResult).length > 0 && (
                  <ButtonBlue
                    disabled={
                      !currentIssue || gameStatus !== TGameStatus.started
                    }
                    className={styles.button}
                    onClick={handleRestart}
                  >
                    Restart round
                  </ButtonBlue>
                )}
              <ButtonBlue
                disabled={gameStatus !== TGameStatus.roundInProgress}
                className={styles.button}
                onClick={handleFinishRound}
              >
                Stop round
              </ButtonBlue>
              <ButtonBlue
                disabled={!issues.length || gameStatus !== TGameStatus.started}
                className={styles.button}
                onClick={handleNextIssue}
              >
                Next issue
              </ButtonBlue>
            </div>
          </>
        ) : (
          <BaseButton className={styles.button} onClick={handleExit}>
            Exit
          </BaseButton>
        )}
      </div>
    </div>
  );
}

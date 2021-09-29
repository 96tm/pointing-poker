import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  gamePageSelectors,
  gameSelectors,
  gameSettingsSelectors,
} from '../../../redux/selectors';
import { gamePageActions } from '../../../redux/slices/game-page/game-page';
import { TGameStatus } from '../../../redux/types';
import BaseTimer from './base-timer/timer';

export default function Timer(): JSX.Element {
  const MAX_SECONDS = 59;
  const dispatch = useDispatch();
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const timer = useSelector(gamePageSelectors.selectTimer);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const intervalHandle = useRef<NodeJS.Timer | null>(null);
  const [lastGameStatus, setLastGameStatus] = useState(gameStatus);

  useEffect(() => {
    let innerTimer = { ...timer };
    if (
      gameStatus === TGameStatus.roundInProgress &&
      (innerTimer.minutes || innerTimer.seconds)
    ) {
      setLastGameStatus(gameStatus);
      intervalHandle.current = setInterval(() => {
        let minutes = innerTimer.minutes;
        if (innerTimer.seconds === 0) {
          minutes = Math.max(0, innerTimer.minutes - 1);
        }
        let seconds = Math.max(0, innerTimer.seconds - 1);
        if (!seconds) {
          if (minutes) {
            seconds = MAX_SECONDS;
            minutes -= 1;
          } else {
            clearInterval(Number(intervalHandle.current) || undefined);
          }
        }
        dispatch(gamePageActions.changeTimer({ minutes, seconds }));
        innerTimer = { minutes, seconds };
        return () => {
          clearInterval(Number(intervalHandle.current) || undefined);
        };
      }, 1000);
    } else if (
      gameStatus === TGameStatus.started &&
      lastGameStatus == TGameStatus.roundInProgress
    ) {
      setLastGameStatus(gameStatus);
      clearInterval(Number(intervalHandle.current) || undefined);
      dispatch(
        gamePageActions.changeTimer({
          minutes: gameSettings?.timer?.minutes || 0,
          seconds: gameSettings?.timer?.seconds || 0,
        })
      );
    }
  }, [gameStatus]);

  return (
    <BaseTimer
      minutes={timer.minutes}
      seconds={timer.seconds}
      disabled={true}
    />
  );
}

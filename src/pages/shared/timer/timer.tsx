import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../redux/selectors';
import { gameSettingsActions } from '../../../redux/slices/game-settings/game-settings-slice';
import { ITimer } from '../../../redux/types';
import styles from './timer.module.scss';

interface ITimerProps {
  minutes?: number;
  seconds?: number;
  disabled?: boolean;
}

export default function Timer({
  minutes,
  seconds,
  disabled = false,
}: ITimerProps): JSX.Element {
  const dispatch = useDispatch();
  const timer = useSelector(gameSettingsSelectors.selectSettings)
    .timer as ITimer;
  return (
    <div className={styles.timer}>
      <div className={styles.legend}>
        <span className="legendMinutes">minutes</span>
        <span className="legendSeconds">seconds</span>
      </div>
      <div className={styles.time}>
        <input
          disabled={disabled}
          type="number"
          min="0"
          max="59"
          className={`${styles.minutes} ${styles.input}`}
          defaultValue={minutes}
          onChange={(event) =>
            dispatch(
              gameSettingsActions.changeSettings({
                timer: {
                  minutes: Number(event.target.value),
                  seconds: timer.seconds,
                },
              })
            )
          }
        />
        <span className={styles.colon}>:</span>
        <input
          disabled={disabled}
          type="number"
          min="5"
          max="59"
          className={`${styles.seconds} ${styles.input}`}
          defaultValue={seconds}
          onChange={(event) =>
            dispatch(
              gameSettingsActions.changeSettings({
                timer: {
                  minutes: timer.minutes,
                  seconds: Number(event.target.value),
                },
              })
            )
          }
        />
      </div>
    </div>
  );
}

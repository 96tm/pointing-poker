import React from 'react';
import { ITimer } from '../../../../../redux/types';
import Timer from '../../../../shared/timer/timer';
import styles from '../settings.module.scss';

interface ITimerSettingProps {
  timer: ITimer;
}

export default function TimerSetting({
  timer,
}: ITimerSettingProps): JSX.Element {
  return (
    <div className={styles.itemSettings}>
      <h5 className={styles.setting}>Round time:</h5>
      <Timer minutes={timer.minutes} seconds={timer.seconds} disabled={false} />
    </div>
  );
}

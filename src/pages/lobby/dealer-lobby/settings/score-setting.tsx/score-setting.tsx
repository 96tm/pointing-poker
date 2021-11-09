import React, { SyntheticEvent } from 'react';
import { TCardType } from '../../../../../redux/types';
import styles from '../settings.module.scss';

interface IScoreSettingProps {
  cardType: TCardType;
  onChange(event: SyntheticEvent): void;
}

export default function ScoreSetting({
  cardType,
  onChange,
}: IScoreSettingProps): JSX.Element {
  return (
    <div className={styles.itemSettings}>
      <label htmlFor="score" className={styles.setting}>
        Score type:
      </label>
      <select
        id="score"
        className={styles.select}
        value={cardType}
        onChange={onChange}
      >
        <option>{TCardType.custom}</option>
        <option>{TCardType.fib}</option>
        <option>{TCardType.powersOfTwo}</option>
      </select>
    </div>
  );
}

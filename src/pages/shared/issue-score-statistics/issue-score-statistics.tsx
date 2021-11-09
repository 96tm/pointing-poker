import React from 'react';
import { TCardScore } from '../../../redux/types';
import PlayCard from '../cards/card/card';
import styles from './issue-score-statistics.module.scss';

interface IIssueScoreStatisticsProps {
  score: TCardScore;
  percentage: number;
  customCardClass?: string;
  customClass?: string;
}

export default function IssueScoreStatistics({
  score,
  percentage,
  customCardClass,
  customClass,
}: IIssueScoreStatisticsProps): JSX.Element {
  const formatPercentage = (value: number): string => {
    if (!Number.isInteger(value)) {
      return value.toFixed(2);
    }
    return value.toString();
  };

  return (
    <div
      className={`${styles.container} ${customClass || ''}`}
      key={`${score}`}
    >
      <PlayCard
        customClass={customCardClass || ''}
        key={`${score}`}
        cardValue={score as TCardScore}
        mode="single"
        isSelected={false}
        onClick={() => undefined}
      />
      <div className={styles.percentageCard}>{`${formatPercentage(
        percentage
      )}%`}</div>
    </div>
  );
}

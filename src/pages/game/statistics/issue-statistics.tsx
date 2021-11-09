import React from 'react';
import { IIssue, Issue } from '../../../redux/types';
import IssueScoreStatistics from '../../shared/issue-score-statistics/issue-score-statistics';
import styles from './issue-statistics.module.scss';

interface IIssueStatisticsProps {
  issue: IIssue;
}

export default function IssueStatistics({
  issue,
}: IIssueStatisticsProps): JSX.Element {
  return (
    <div className={styles.statistics}>
      {Issue.calculateStatistics(issue).map(([score, percentage]) => (
        <IssueScoreStatistics
          customClass={styles.customIssueStatistics}
          customCardClass={styles.customCard}
          key={score}
          score={score}
          percentage={percentage}
        />
      ))}
    </div>
  );
}

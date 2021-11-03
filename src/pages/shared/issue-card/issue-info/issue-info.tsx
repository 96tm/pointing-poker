import React from 'react';
import { IIssue } from '../../../../redux/types';
import styles from './issue-info.module.scss';

interface IIssueInfoProps {
  issue: IIssue;
  isCurrentIssue: boolean;
  setIsPopoverShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IssueInfo({
  issue,
  isCurrentIssue,
  setIsPopoverShown,
}: IIssueInfoProps): JSX.Element {
  return (
    <div
      className={styles.issueInfo}
      onMouseEnter={() => setIsPopoverShown(true)}
    >
      {isCurrentIssue && <div className={styles.currentStatus}>current</div>}
      <div className={styles.title}>{issue.title}</div>
      <div className={styles.priority}>
        <span className={styles.capitalize}>{issue.priority}</span> priority
      </div>
    </div>
  );
}

import React from 'react';
import IssueCard from '../../../shared/issue-card/issue-card';
import CreateIssueCard from '../../../shared/card-create-issue/card-create-issue';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../../../redux/selectors';
import styles from './issues-list.module.scss';

export default function IssuesList(): JSX.Element {
  const issues = useSelector(gameSelectors.selectIssues);

  return (
    <div className={styles.issuesContainer}>
      <h2 className={styles.titleIssues}>Issues:</h2>
      <div className={styles.wrapperIssue}>
        {issues.map((item) => {
          return (
            <div className={styles.card} key={item.id}>
              <IssueCard issue={item} canEditScore={false} canRemove={true} />
            </div>
          );
        })}
        <div className={styles.createIssueCardContainer}>
          <CreateIssueCard />
        </div>
      </div>
    </div>
  );
}

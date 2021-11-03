import React from 'react';
import { useHistory } from 'react-router';
import { IIssue, Issue } from '../../redux/types';
import { ReactComponent as IconDownload } from '../../shared/assets/icons/download.svg';
import { ReactComponent as IconRestart } from '../../shared/assets/icons/restart.svg';
import { ButtonBlue } from '../shared/buttons/button-blue/button-blue';
import IssueCard from '../shared/issue-card/issue-card';
import IssueScoreStatistics from '../shared/issue-score-statistics/issue-score-statistics';
import SprintHeading from '../shared/sprint-heading/sprint-heading';
import styles from './game-result.module.scss';

export default function GameResult(): JSX.Element {
  const history = useHistory();
  const { issues } = (history?.location?.state as { issues: IIssue[] }) || {
    issues: [],
  };

  const generateCSV = (): string => {
    const prefix =
      'data:application/octet-stream, Issue%20title%2CCard%20value%2CPercentage\n';
    const result = issues.reduce((resultString, issue) => {
      const issueStatistics = Issue.calculateStatistics(issue);
      const issueTitle = `${issue.title.replaceAll(' ', '%20')}`;
      const rows = issueStatistics.reduce((acc, [score, percentage]) => {
        return `${acc}${issueTitle}%2C${score}%2C${percentage}\n`;
      }, '');
      return `${resultString}${rows}`;
    }, prefix);
    return result;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headingContainer}>
          <SprintHeading issues={issues} />
          <a href="/" title="Restart game" className={styles.buttonRestart}>
            <ButtonBlue>
              <IconRestart />
            </ButtonBlue>
          </a>
          <a
            title="Download result"
            className={styles.buttonDownload}
            download="statistics.csv"
            href={generateCSV()}
          >
            <ButtonBlue>
              <IconDownload />
            </ButtonBlue>
          </a>
        </div>
        <div className={styles.setOfIssues}>
          {issues.map((issue) => {
            return (
              <div className={styles.issueCardContainer} key={issue.id}>
                <IssueCard
                  customClass={styles.customIssueCard}
                  issue={issue}
                  canEditScore={false}
                  canRemove={false}
                />
                <div className={styles.issueStatisticBlock}>
                  {Issue.calculateStatistics(issue).map(
                    ([score, percentage]) => (
                      <IssueScoreStatistics
                        key={`${issue.id}_${score}`}
                        score={score}
                        percentage={percentage}
                      />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

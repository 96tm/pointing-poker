import React from 'react';
import ButtonAdd from '../buttons/button-add/button-add';
import styles from './issue-card-new.module.scss';

interface IIssueCardNewProps {
  handleCreateClick: () => void;
}

export default function IssueCardNew({
  handleCreateClick,
}: IIssueCardNewProps): JSX.Element {
  return (
    <div className={styles.issueCard}>
      <div className={styles.title}>Create new issue</div>
      <div className={styles.buttonAddContainer}>
        <ButtonAdd onClick={handleCreateClick} />
      </div>
    </div>
  );
}

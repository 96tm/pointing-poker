import React from 'react';
import { IIssue } from '../../../redux/types';
import styles from './sprint-heading.module.scss';

interface ISprintHeadingProps {
  issues: IIssue[];
}

export default function SprintHeading({
  issues,
}: ISprintHeadingProps): JSX.Element {
  const generateHeading = () => {
    let str = '';
    issues.map((item) => {
      str += `${item.title}, `;
    });
    return str.length < 30 ? str : `${str.slice(0, 29)}...`;
  };

  const title = generateHeading();
  return (
    <h3 className={styles.sprintHeading}>
      Sprint planning <span className={styles.issues}>(issues: {title})</span>
    </h3>
  );
}

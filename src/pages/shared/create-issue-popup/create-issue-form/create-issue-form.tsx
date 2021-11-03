import React from 'react';
import { IIssue, TIssuePriority } from '../../../../redux/types';
import styles from './create-issue-form.module.scss';

export interface ICreateIssueFormProps {
  info: IIssue;
  warning: string;
  setIssueFields: React.Dispatch<React.SetStateAction<IIssue>>;
}

export default function CreateIssueForm({
  info,
  setIssueFields,
  warning,
}: ICreateIssueFormProps): JSX.Element {
  return (
    <div className={styles.container}>
      <h4 className={styles.popupTitle}>Create Issue</h4>
      <form className={styles.form}>
        <label htmlFor="title" className={styles.label}>
          <p>Title:</p>
          <input
            type="text"
            name="title"
            className={styles.titleInput}
            value={info.title}
            onChange={(event) =>
              setIssueFields((prev) => ({ ...prev, title: event.target.value }))
            }
          />
        </label>
        <label htmlFor="link" className={styles.label}>
          <p>Link:</p>
          <input
            type="url"
            name="link"
            className={styles.urlInput}
            value={info.link}
            onChange={(event) =>
              setIssueFields((prev) => ({ ...prev, link: event.target.value }))
            }
          />
        </label>
        <label htmlFor="priority" className={styles.label}>
          <p>Priority:</p>
          <select
            name="priority"
            className={styles.prioritySelect}
            value={info.priority}
            onChange={(event) =>
              setIssueFields((prev) => ({
                ...prev,
                priority: event.target.value as TIssuePriority,
              }))
            }
          >
            <option>{TIssuePriority.high}</option>
            <option>{TIssuePriority.low}</option>
            <option>{TIssuePriority.medium}</option>
          </select>
        </label>
      </form>
      <div className={styles.warning}>{warning}</div>
    </div>
  );
}

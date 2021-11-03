import React, { useEffect } from 'react';
import { IIssue } from '../../../../redux/types';
import Popover from 'react-bootstrap/Popover';
import PopoverTitle from 'react-bootstrap/PopoverTitle';
import PopoverContent from 'react-bootstrap/PopoverContent';
import styles from './issue-info-popover.module.scss';

interface IIssueInfoPopoverProps {
  issue: IIssue;
  setIsPopoverShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IssueInfoPopover({
  issue,
  setIsPopoverShown,
}: IIssueInfoPopoverProps): JSX.Element {
  function handleMouseEnter() {
    setIsPopoverShown(false);
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseEnter);
    return () => {
      document.removeEventListener('mousemove', handleMouseEnter);
    };
  }, []);

  return (
    <div
      onMouseMove={(event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
      }}
    >
      <Popover id="popover-basic">
        <PopoverTitle as="h3">Issue info</PopoverTitle>
        <PopoverContent>
          <div className={styles.infoPopup}>
            <div className={styles.infoTitle}>
              <div className={styles.nameInfo}>Title:</div>
              <div className={styles.infoValue}>{issue.title}</div>
            </div>
            <div className={styles.infoLink}>
              <div className={styles.nameInfo}>Link:</div>
              <div className={styles.infoValue}>
                <a href={issue.link}>{issue.link}</a>
              </div>
            </div>
            <div className={styles.infoPriority}>
              <div className={styles.nameInfo}>Priority:</div>
              <div className={styles.infoValue}>{issue.priority}</div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

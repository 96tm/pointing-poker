import React, { useEffect } from 'react';
import Popover from 'react-bootstrap/Popover';
import PopoverTitle from 'react-bootstrap/PopoverTitle';
import PopoverContent from 'react-bootstrap/PopoverContent';
import { IUser } from '../../../../redux/types';
import Avatar from '../avatar/avatar';
import styles from './player-info-popover.module.scss';

interface IPlayerInfoPopoverProps {
  player: IUser;
  setIsPopoverShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlayerInfoPopover({
  player,
  setIsPopoverShown,
}: IPlayerInfoPopoverProps): JSX.Element {
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
        <PopoverTitle as="h3">Player info</PopoverTitle>
        <PopoverContent>
          <div className={styles.infoPopup}>
            <div className={styles.fieldAvatar}>
              <Avatar player={player} />
            </div>
            <div className={styles.field}>
              <div className={styles.key}>First name:</div>
              <div className={styles.value}>{player.firstName}</div>
            </div>
            {player.lastName && (
              <div className={styles.field}>
                <div className={styles.key}>Last name:</div>
                <div className={styles.value}>{player.firstName}</div>
              </div>
            )}
            {player.jobPosition && (
              <div className={styles.field}>
                <div className={styles.key}>Job position:</div>
                <div className={styles.value}>{player.jobPosition}</div>
              </div>
            )}
            <div className={styles.field}>
              <div className={styles.key}>Role:</div>
              <div className={styles.value}>{player.role}</div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

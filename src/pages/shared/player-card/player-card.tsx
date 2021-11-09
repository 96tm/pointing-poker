import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { IUser, TUserRole } from '../../../redux/types';
import observer from '../../../shared/assets/icons/observer.svg';
import removeUser from '../../../shared/assets/icons/remove-user.svg';
import Avatar from './avatar/avatar';
import DealerKickPopup from './dealer-kick-popup/dealer-kick-popup';
import PlayerInfoPopover from './player-info-popover/player-info-popover';
import PlayerKickPopup from './player-kick-popup/player-kick-popup';
import styles from './player-card.module.scss';

export interface IPlayerCardProps {
  user: IUser;
  customClass?: string;
}

export default function PlayerCard({
  user,
  customClass,
}: IPlayerCardProps): JSX.Element {
  const MIN_NUMBER_OF_PLAYERS_TO_VOTE = 3;
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const players = useSelector(gameSelectors.selectPlayers);
  const [isDealerKickPopupShown, setIsDealerKickPopupShown] = useState(false);
  const [isPlayerKickPopupShown, setIsPlayerKickPopupShown] = useState(false);
  const [isPopoverShown, setIsPopoverShown] = useState(false);

  const canKick = () => {
    return (
      currentUser.id !== user.id &&
      ((currentUser.role !== TUserRole.observer &&
        players.filter((player) => player.role === TUserRole.player).length >=
          MIN_NUMBER_OF_PLAYERS_TO_VOTE &&
        user.role !== TUserRole.dealer) ||
        currentUser.role === TUserRole.dealer)
    );
  };

  const handleClickKick = () => {
    if (currentUser.id === dealer.id) {
      setIsDealerKickPopupShown(true);
    } else {
      setIsPlayerKickPopupShown(true);
    }
  };

  const handleCloseKickPopup = () => {
    setIsDealerKickPopupShown(false);
    setIsPlayerKickPopupShown(false);
  };

  return (
    <div className={`${styles.card} ${customClass || ''}`}>
      <PlayerKickPopup
        isShown={isPlayerKickPopupShown}
        playerToKick={user}
        onClose={handleCloseKickPopup}
      />
      <DealerKickPopup
        isShown={isDealerKickPopupShown}
        playerToKick={user}
        onClose={handleCloseKickPopup}
      />
      <div
        className={styles.avatarContainer}
        onMouseEnter={() => {
          setIsPopoverShown(true);
        }}
      >
        <Avatar player={user} />
      </div>
      <div className={styles.info}>
        {currentUser.id === user.id && (
          <div className={styles.currentUser}>It`s you</div>
        )}
        <div className={styles.name}>
          {user?.firstName} {user?.lastName}
        </div>
        <div className={styles.jobPosition}>{user?.jobPosition}</div>
      </div>
      {user.role === TUserRole.observer && (
        <img
          src={observer}
          title="Observer"
          className={styles.observerImg}
          alt="Observer"
        />
      )}
      {canKick() && (
        <button className={styles.remove} onClick={handleClickKick}>
          <img
            src={removeUser}
            className={styles.removeImg}
            title="Kick player"
            alt="Kick"
          />
        </button>
      )}
      {isPopoverShown && (
        <PlayerInfoPopover
          player={user}
          setIsPopoverShown={setIsPopoverShown}
        />
      )}
    </div>
  );
}

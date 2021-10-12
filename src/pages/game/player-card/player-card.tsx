import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import { thunks } from '../../../redux/thunks/thunks';
import { IRequestResult, IUser, TUserRole, User } from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import { BasePopup } from '../../shared/base-popup/base-popup';
import removeUser from '../../../shared/assets/icons/remove-user.svg';
import observer from '../../../shared/assets/icons/observer.svg';
import styles from './player-card.module.scss';

export interface IPlayerCardProps {
  user: IUser;
  customClass?: string;
}

const PlayerCard = ({ user, customClass }: IPlayerCardProps): JSX.Element => {
  const MIN_NUMBER_OF_PLAYERS_TO_VOTE = 3;
  const infoPopupRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(gameSelectors.selectId);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const players = useSelector(gameSelectors.selectPlayers);
  const [showDealerKickPopup, setDealerKickPopup] = useState(false);
  const [showPlayerKickPopup, setPlayerKickPopup] = useState(false);
  const [isWithinPlayerCard, setIsWithinPlayerCard] = useState(false);
  const [isWithinPlayerCardInfo, setIsWithinPlayerCardInfo] = useState(false);

  const setInfoPopupClass = (): string => {
    const popup = infoPopupRef.current;
    if (popup) {
      if (popup.getBoundingClientRect().right > globalThis.innerWidth) {
        return styles.infoPopupRight;
      } else {
        return styles.infoPopupLeft;
      }
    }
    return '';
  };

  const canKick = () => {
    return (
      currentUser.id !== user.id &&
      ((currentUser.role !== TUserRole.observer &&
        players.length > MIN_NUMBER_OF_PLAYERS_TO_VOTE &&
        user.role !== TUserRole.dealer) ||
        currentUser.role === TUserRole.dealer)
    );
  };

  const getName = (a: string, b: string | undefined): string => {
    let str = '';
    str += a.slice(0, 1);
    if (b != undefined) {
      str += b.slice(0, 1);
    }
    return str;
  };

  const handleClickKick = () => {
    if (currentUser.id === dealer.id) {
      setDealerKickPopup(true);
    } else {
      setPlayerKickPopup(true);
    }
  };

  const handleCloseKickPopup = () => {
    setDealerKickPopup(false);
    setPlayerKickPopup(false);
  };

  const kick = async () => {
    const response = await dispatch(
      thunks.kickPlayerThunk({
        dealerId: currentUser.id,
        kickedPlayerId: user.id,
        gameId,
      })
    );
    handleCloseKickPopup();
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  const startVotingToKick = async () => {
    const response = await dispatch(
      thunks.startVotingToKickThunk({
        votingPlayerId: currentUser.id,
        kickedPlayerId: user.id,
        gameId,
      })
    );
    handleCloseKickPopup();
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  return (
    <div className={`${styles.card} ${customClass || ''}`}>
      <BasePopup
        isShown={showDealerKickPopup}
        headingText="Kick player"
        buttonOkText="Kick"
        buttonCancelText="Cancel"
        buttonOkProps={{ onClick: kick }}
        buttonCancelProps={{ onClick: handleCloseKickPopup }}
      >
        <div className={styles.kickPopup}>
          {`Kick ${user.firstName} ${user.lastName} from the game?`}
        </div>
        <div className={styles.kickPopupText}>
          Kick
          <span className={styles.kickedPlayerName}>
            {' '}
            {User.getFullName(user?.firstName as string, user?.lastName)}{' '}
          </span>
          from the game?
        </div>
      </BasePopup>
      <BasePopup
        isShown={showPlayerKickPopup}
        headingText="Kick player"
        buttonOkText="Kick"
        buttonCancelText="Cancel"
        buttonOkProps={{ onClick: startVotingToKick }}
        buttonCancelProps={{ onClick: handleCloseKickPopup }}
      >
        <div className={styles.kickPopupText}>
          Vote to kick{' '}
          <span className={styles.kickedPlayerName}>
            {User.getFullName(user?.firstName as string, user?.lastName)}
          </span>{' '}
          from the game?
        </div>
      </BasePopup>

      <div
        className={styles.avatarContainer}
        onMouseEnter={() => {
          setIsWithinPlayerCard(true);
        }}
        onMouseLeave={() => {
          setIsWithinPlayerCard(false);
        }}
      >
        {user?.image ? (
          <img className={styles.img} src={user?.image} />
        ) : (
          <div className={styles.avatar}>
            {getName(user.firstName, user?.lastName)}
          </div>
        )}
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
      {(isWithinPlayerCard || isWithinPlayerCardInfo) && (
        <div
          ref={infoPopupRef}
          className={`${styles.infoPopup} ${setInfoPopupClass()}`}
          onMouseEnter={() => {
            setIsWithinPlayerCardInfo(true);
          }}
          onMouseLeave={() => {
            setIsWithinPlayerCardInfo(false);
          }}
        >
          <div className={styles.image}>
            <div className={styles.avatarContainer}>
              {user?.image ? (
                <img className={styles.img} src={user?.image} />
              ) : (
                <div className={styles.avatar}>
                  {getName(user.firstName, user?.lastName)}
                </div>
              )}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.infoTitle}>
              <div className={styles.nameInfo}>Name:</div>
              <div className={styles.infoValue}>
                {User.getFullName(user.firstName, user.lastName)}
              </div>
            </div>
            <div className={styles.infoRole}>
              <div className={styles.nameInfo}>Role:</div>
              <div className={styles.infoValue}>{user.role}</div>
            </div>
            {user.jobPosition && (
              <div className={styles.infoPosition}>
                <div className={styles.nameInfo}>Job position:</div>
                <div className={styles.infoValue}>{user.jobPosition}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;

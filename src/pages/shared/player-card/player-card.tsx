import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import { thunks } from '../../../redux/thunks/thunks';
import { IRequestResult, IUser, TUserRole } from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import removeUser from '../../../shared/assets/icons/remove-user.svg';
import { BasePopup } from '../base-popup/base-popup';
import styles from './player-card.module.scss';

interface IPlayerProps {
  user: IUser;
  className?: string;
}

const Player = ({ user }: IPlayerProps): JSX.Element => {
  const MIN_NUMBER_OF_PLAYERS_TO_VOTE = 3;
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(gameSelectors.selectId);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const [showDealerKickPopup, setDealerKickPopup] = useState(false);
  const [showPlayerKickPopup, setPlayerKickPopup] = useState(false);
  const players = useSelector(gameSelectors.selectPlayers);
  const canKick =
    currentUser.id !== user.id &&
    ((currentUser.role !== TUserRole.observer &&
      players.length > MIN_NUMBER_OF_PLAYERS_TO_VOTE &&
      user.role !== TUserRole.dealer) ||
      currentUser.role === TUserRole.dealer);

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
    <div className={styles.card}>
      <BasePopup
        isShown={showDealerKickPopup}
        headingText="Kick player"
        buttonOkText="Kick"
        buttonCancelText="Cancel"
        buttonOkProps={{ onClick: kick }}
        buttonCancelProps={{ onClick: handleCloseKickPopup }}
      >
        <div className={styles.dealerKickPopup}>
          Kick
          <span className={styles.nameKickPlayer}>
            {`
              ${user.firstName} ${user.lastName} `}
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
        <div className={styles.dealerKickPopup}>
          Kick
          <span className={styles.nameKickPlayer}>
            {`
              ${user.firstName} ${user.lastName} `}
          </span>
          from the game?
        </div>
      </BasePopup>
      {user?.image ? (
        <img className={styles.img} src={user?.image}></img>
      ) : (
        <div className={styles.avatar}>
          {getName(user.firstName, user?.lastName)}
        </div>
      )}
      <div className={styles.name}>
        {currentUser.id === user.id && (
          <h6 className={styles.currentUser}>It`s you</h6>
        )}
        <h5 className={styles.h5}>
          {user?.firstName} {user?.lastName}
        </h5>
        <h6 className={styles.h6}>{user?.jobPosition}</h6>
      </div>
      {canKick && (
        <button className={styles.remove} onClick={handleClickKick}>
          <img src={removeUser} className={styles.removeImg} alt="Kick" />
        </button>
      )}
    </div>
  );
};

export default Player;

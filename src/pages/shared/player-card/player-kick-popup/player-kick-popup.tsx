import React from 'react';
import { BasePopup } from '../../base-popup/base-popup';
import { IRequestResult, IUser, User } from '../../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { startVotingToKickThunk } from '../../../../redux/thunks';
import {
  currentUserSelectors,
  gameSelectors,
} from '../../../../redux/selectors';
import { appActions } from '../../../../redux/slices/app/app-slice';
import styles from '../player-card.module.scss';

interface IPlayerKickPopupProps {
  isShown: boolean;
  playerToKick: IUser;
  onClose(): void;
}

export default function PlayerKickPopup({
  isShown,
  playerToKick,
  onClose,
}: IPlayerKickPopupProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(gameSelectors.selectId);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);

  const startVotingToKick = async () => {
    const response = await dispatch(
      startVotingToKickThunk({
        votingPlayerId: currentUser.id,
        kickedPlayerId: playerToKick.id,
        gameId,
      })
    );
    onClose();
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
    <BasePopup
      isShown={isShown}
      buttonOkText="Kick"
      buttonCancelText="Cancel"
      buttonOkProps={{ onClick: startVotingToKick }}
      buttonCancelProps={{ onClick: onClose }}
    >
      <div className={styles.kickPopup}>
        <h4 className={styles.popupTitle}>Kick player</h4>
        <div className={styles.kickPopupText}>
          Vote to kick{' '}
          <span className={styles.kickedPlayerName}>
            {User.getFullName(
              playerToKick?.firstName as string,
              playerToKick?.lastName
            )}
          </span>{' '}
          from the game?
        </div>
      </div>
    </BasePopup>
  );
}

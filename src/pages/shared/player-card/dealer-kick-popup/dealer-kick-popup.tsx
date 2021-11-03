import React from 'react';
import { BasePopup } from '../../base-popup/base-popup';
import { IRequestResult, IUser, User } from '../../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { thunks } from '../../../../redux/thunks/thunks';
import {
  currentUserSelectors,
  gameSelectors,
} from '../../../../redux/selectors';
import { appActions } from '../../../../redux/slices/app/app-slice';
import styles from '../player-card.module.scss';

interface IDealerKickPopupProps {
  isShown: boolean;
  playerToKick: IUser;
  handleCloseKickPopup(): void;
}

export default function DealerKickPopup({
  isShown,
  playerToKick,
  handleCloseKickPopup,
}: IDealerKickPopupProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(gameSelectors.selectId);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);

  const kick = async () => {
    const response = await dispatch(
      thunks.kickPlayerThunk({
        dealerId: currentUser.id,
        kickedPlayerId: playerToKick.id,
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
    <BasePopup
      isShown={isShown}
      buttonOkText="Kick"
      buttonCancelText="Cancel"
      buttonOkProps={{ onClick: kick }}
      buttonCancelProps={{ onClick: handleCloseKickPopup }}
    >
      <div className={styles.kickPopup}>
        <h4 className={styles.popupTitle}>Kick player</h4>
        <div className={styles.kickPopupText}>
          Kick
          <span className={styles.kickedPlayerName}>
            {' '}
            {User.getFullName(
              playerToKick?.firstName as string,
              playerToKick?.lastName
            )}{' '}
          </span>
          from the game?
        </div>
      </div>
    </BasePopup>
  );
}

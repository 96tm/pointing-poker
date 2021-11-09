import React from 'react';
import {
  BasePopup,
  IBasePopupProps,
} from '../../../shared/base-popup/base-popup';
import { IRequestResult, IUser, User } from '../../../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { voteToKickThunk } from '../../../../redux/thunks';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import {
  gameSelectors,
  votingKickSelectors,
  currentUserSelectors,
} from '../../../../redux/selectors';
import { appActions } from '../../../../redux/slices/app/app-slice';
import styles from './kick-player-popup.module.scss';

interface IKickPlayerPopupProps extends IBasePopupProps {
  setIsVotingPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
  playerToKick: IUser | undefined;
}

export default function KickPlayerPopup({
  isShown,
  playerToKick,
  setIsVotingPopupShown,
}: IKickPlayerPopupProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(gameSelectors.selectId);
  const votingKick = useSelector(votingKickSelectors.selectVotingKick);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);

  const declineKickVote = async () => {
    const response = await dispatch(
      voteToKickThunk({
        votingPlayerId: currentUser.id,
        gameId,
        kickedPlayerId: votingKick.kickedPlayerId,
        accept: false,
      })
    );
    setIsVotingPopupShown(false);
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

  const acceptKickVote = async () => {
    const response = await dispatch(
      voteToKickThunk({
        votingPlayerId: currentUser.id,
        gameId,
        kickedPlayerId: votingKick.kickedPlayerId,
        accept: true,
      })
    );
    setIsVotingPopupShown(false);
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
      headingText="Voting to kick player"
      buttonOkText="Yes"
      buttonCancelText="No"
      buttonOkProps={{ onClick: acceptKickVote }}
      buttonCancelProps={{ onClick: declineKickVote }}
    >
      <div className={styles.dealerKickPopup}>
        Kick{' '}
        <span className={styles.nameKickPlayer}>
          {User.getFullName(
            playerToKick?.firstName as string,
            playerToKick?.lastName
          )}
        </span>{' '}
        from the game1?
      </div>
    </BasePopup>
  );
}

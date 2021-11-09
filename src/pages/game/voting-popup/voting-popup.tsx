import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import { voteToKickThunk } from '../../../redux/thunks';
import { IRequestResult, User } from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import { IVotingKick } from '../../../redux/types/voting-kick';
import { BasePopup } from '../../shared/base-popup/base-popup';
import styles from './voting-popup.module.scss';

interface IVotingPopupProps {
  isShown: boolean;
  setIsVotingPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
  votingKick: IVotingKick;
}

export default function VotingPopup({
  isShown,
  setIsVotingPopupShown,
  votingKick,
}: IVotingPopupProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const playerToKick = useSelector(gameSelectors.selectPlayers).find(
    (player) => player.id === votingKick.kickedPlayerId
  );
  const gameId = useSelector(gameSelectors.selectId);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);

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

  return (
    <BasePopup
      isShown={isShown}
      modal={true}
      headingText="Kick player"
      buttonOkText="Yes"
      buttonCancelText="No"
      buttonOkProps={{ onClick: acceptKickVote }}
      buttonCancelProps={{ onClick: declineKickVote }}
    >
      <div className={styles.dealerKickPopup}>
        Kick
        <span className={styles.nameKickPlayer}>
          {User.getFullName(
            playerToKick?.firstName as string,
            playerToKick?.lastName
          )}
        </span>
        from the game?
      </div>
    </BasePopup>
  );
}

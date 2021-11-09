import { appActions } from '../../../../redux/slices/app/app-slice';
import { votingKickActions } from '../../../../redux/slices/voting-kick/voting-kick';
import { store } from '../../../../redux/store';
import { User } from '../../../../redux/types';
import { InfoMessage } from '../../../../redux/types/info-message';
import { IVoteToKickResponseWS } from '../../types';

export default function playerNotKickedByVote({
  firstName,
  lastName,
  kickedPlayerId,
}: IVoteToKickResponseWS): void {
  const currentUser = store.getState().currentUser;
  if (currentUser.id !== kickedPlayerId) {
    const playerName = User.getFullName(firstName, lastName);
    store.dispatch(votingKickActions.resetVotingKick());
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(
          `Voting has ended, player ${playerName} was not kicked from the game`
        ).toObject()
      )
    );
  }
}

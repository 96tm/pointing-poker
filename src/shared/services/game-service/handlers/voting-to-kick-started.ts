import { votingKickActions } from '../../../../redux/slices/voting-kick/voting-kick';
import { store } from '../../../../redux/store';
import { TUserRole } from '../../../../redux/types';
import { IStartVotingToKickResponseWS } from '../../types';

export default function votingToKickStarted({
  kickedPlayerId,
  votingPlayerId,
}: IStartVotingToKickResponseWS): void {
  const currentUser = store.getState().currentUser;
  if (
    currentUser.id !== kickedPlayerId &&
    currentUser.role !== TUserRole.dealer
  ) {
    store.dispatch(
      votingKickActions.changeVotingKick({ kickedPlayerId, votingPlayerId })
    );
  }
}

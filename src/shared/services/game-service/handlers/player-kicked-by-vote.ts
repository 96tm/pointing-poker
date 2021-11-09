import { appActions } from '../../../../redux/slices/app/app-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { votingKickActions } from '../../../../redux/slices/voting-kick/voting-kick';
import { store } from '../../../../redux/store';
import { TGameStatus, User } from '../../../../redux/types';
import { InfoMessage } from '../../../../redux/types/info-message';
import { IVoteToKickResponseWS } from '../../types';

export default function playerKickedByVote({
  kickedPlayerId,
  firstName,
  lastName,
}: IVoteToKickResponseWS): void {
  const currentUser = store.getState().currentUser;
  if (currentUser.id === kickedPlayerId) {
    store.dispatch(gameActions.changeStatus(TGameStatus.inactive));
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(
          'You have been kicked from the game by vote =('
        ).toObject()
      )
    );
  } else {
    store.dispatch(gameActions.deletePlayer(kickedPlayerId));
    const playerName = User.getFullName(firstName, lastName);
    store.dispatch(votingKickActions.resetVotingKick());
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(
          `Player ${playerName} has been kicked from the game by vote`
        ).toObject()
      )
    );
  }
}

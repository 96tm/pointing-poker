import { appActions } from '../../../../redux/slices/app/app-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { TGameStatus, User } from '../../../../redux/types';
import { InfoMessage } from '../../../../redux/types/info-message';
import { IKickPlayerResponseWS } from '../../types';

export default function playerKicked({
  kickedPlayerId,
  firstName,
  lastName,
}: IKickPlayerResponseWS): void {
  const currentUserId = store.getState().currentUser.id;
  if (currentUserId === kickedPlayerId) {
    store.dispatch(gameActions.changeStatus(TGameStatus.inactive));
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(`You have been kicked from the game =(`).toObject()
      )
    );
  } else {
    store.dispatch(gameActions.deletePlayer(kickedPlayerId));
    const playerName = User.getFullName(firstName, lastName);
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(
          `Player ${playerName} has been kicked from the game`
        ).toObject()
      )
    );
  }
}

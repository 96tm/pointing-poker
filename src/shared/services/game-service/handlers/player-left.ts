import { appActions } from '../../../../redux/slices/app/app-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { TGameStatus, User } from '../../../../redux/types';
import { InfoMessage } from '../../../../redux/types/info-message';
import { ILeaveGameResponseWS } from '../../types';

export default function playerLeft({
  playerId,
  firstName,
  lastName,
}: ILeaveGameResponseWS): void {
  const currentUser = store.getState().currentUser;
  if (currentUser.id === playerId) {
    store.dispatch(gameActions.changeStatus(TGameStatus.inactive));
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(`You have left the game`).toObject()
      )
    );
  } else {
    store.dispatch(gameActions.deletePlayer(playerId));
    const playerName = User.getFullName(firstName, lastName);
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(`Player ${playerName} has left the game`).toObject()
      )
    );
  }
}

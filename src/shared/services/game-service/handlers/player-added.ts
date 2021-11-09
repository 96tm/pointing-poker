import { appActions } from '../../../../redux/slices/app/app-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { User } from '../../../../redux/types';
import { InfoMessage } from '../../../../redux/types/info-message';
import { IAddPlayerResponseWS } from '../../types';

export default function playerAdded({
  addedPlayer,
}: IAddPlayerResponseWS): void {
  const players = store.getState().game.players;
  store.dispatch(gameActions.changePlayers(players.concat(addedPlayer)));
  const playerName = User.getFullName(
    addedPlayer.firstName,
    addedPlayer.lastName
  );
  store.dispatch(
    appActions.addOneInfoMessage(
      new InfoMessage(`Player ${playerName} has joined the game`).toObject()
    )
  );
}

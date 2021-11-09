import { appActions } from '../../../../redux/slices/app/app-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { TGameStatus } from '../../../../redux/types';
import { InfoMessage } from '../../../../redux/types/info-message';

export default function gameFinished(): void {
  store.dispatch(gameActions.changeStatus(TGameStatus.inactive));
  store.dispatch(
    appActions.addOneInfoMessage(
      new InfoMessage(`Game finished, thanks for playing`).toObject()
    )
  );
}

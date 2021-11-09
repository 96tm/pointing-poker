import { appActions } from '../../../../redux/slices/app/app-slice';
import { gamePageActions } from '../../../../redux/slices/game-page/game-page';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { TGameStatus } from '../../../../redux/types';
import { InfoMessage } from '../../../../redux/types/info-message';

export default function roundStarted(): void {
  const timer = store.getState().gameSettings.timer;
  if (timer) {
    store.dispatch(gamePageActions.changeTimer(timer));
  }
  store.dispatch(gameActions.changeStatus(TGameStatus.roundInProgress));
  store.dispatch(
    appActions.addOneInfoMessage(new InfoMessage('Round started').toObject())
  );
}

import { appActions } from '../../../../redux/slices/app/app-slice';
import { gameSettingsActions } from '../../../../redux/slices/game-settings/game-settings-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { TGameStatus } from '../../../../redux/types';
import { InfoMessage } from '../../../../redux/types/info-message';
import { IStartGameResponseWS } from '../../types';

export default function gameStarted({ settings }: IStartGameResponseWS): void {
  store.dispatch(gameSettingsActions.changeSettings(settings));
  store.dispatch(gameActions.changeStatus(TGameStatus.started));
  store.dispatch(
    appActions.addOneInfoMessage(new InfoMessage('Game started').toObject())
  );
}

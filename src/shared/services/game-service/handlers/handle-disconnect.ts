import { appActions } from '../../../../redux/slices/app/app-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { TGameStatus } from '../../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';

export default function handleDisconnect(reason: string): void {
  if (!['io server disconnect', 'io client disconnect'].includes(reason)) {
    if (store.getState().game.status === TGameStatus.inactive) {
      store.dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(
            `Can't connect to server`,
            TInfoMessageType.error
          ).toObject()
        )
      );
    } else {
      store.dispatch(gameActions.changeStatus(TGameStatus.inactive));
      store.dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(
            `Server connection lost =( ${reason}`,
            TInfoMessageType.error
          )
        )
      );
    }
  }
}

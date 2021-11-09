import { appActions } from '../../../../redux/slices/app/app-slice';
import { store } from '../../../../redux/store';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';

export default function handleError(error: Error): void {
  store.dispatch(
    appActions.addOneInfoMessage(
      new InfoMessage(`Connection error: ${error}`, TInfoMessageType.error)
    )
  );
}

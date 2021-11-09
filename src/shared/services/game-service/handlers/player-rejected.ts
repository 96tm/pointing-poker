import { appActions } from '../../../../redux/slices/app/app-slice';
import { store } from '../../../../redux/store';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import { IRejectPlayerResponseWS } from '../../types';

export default function playerRejected({}: IRejectPlayerResponseWS): void {
  store.dispatch(
    appActions.addOneInfoMessage(
      new InfoMessage(
        'Dealer has rejected your request =(',
        TInfoMessageType.error
      ).toObject()
    )
  );
}

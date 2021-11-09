import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { Message } from '../../../../redux/types';
import { IPostMessageResponseWS } from '../../types';

export default function messagePosted({
  message,
  messageId,
  userId,
}: IPostMessageResponseWS): void {
  store.dispatch(
    gameActions.postMessage(
      new Message({ id: messageId, userId, message }).toObject()
    )
  );
}

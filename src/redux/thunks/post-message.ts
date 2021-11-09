import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IPostMessageResponse } from '../../shared/services/types';
import { gameActions } from '../slices/game/game-slice';
import {
  IRequestResult,
  IClientPostMessageParameters,
  Message,
} from '../types';

export const postMessageThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientPostMessageParameters
>('game/postMessageThunk', async ({ message, gameId }, thunkApi) => {
  const response = await ApiService.postMessage({
    message,
    gameId,
  });
  if (response.message) {
    return response;
  }
  const { messageId } = response as IPostMessageResponse;
  const postedMessage = new Message({ ...message, id: messageId }).toObject();
  thunkApi.dispatch(gameActions.postMessage(postedMessage));
  return { messageId };
});

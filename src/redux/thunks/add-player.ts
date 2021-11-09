import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IAddPlayerResponse } from '../../shared/services/types';
import { currentUserActions } from '../slices/current-user/current-user-slice';
import { IClientAddPlayerResult, IClientAddPlayerParameters } from '../types';

export const addPlayerThunk = createAsyncThunk<
  Partial<IClientAddPlayerResult>,
  IClientAddPlayerParameters
>('game/addPlayerThunk', async ({ addedPlayer, gameId }, thunkApi) => {
  thunkApi.dispatch(currentUserActions.changeCurrentUser(addedPlayer));
  const response = (await ApiService.addPlayer({
    addedPlayer,
    gameId,
  })) as IAddPlayerResponse;
  return response;
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientStartGameParameters } from '../types';

export const startGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientStartGameParameters
>('game/startGameThunk', async ({ dealerId, settings, gameId }) => {
  const response = await ApiService.startGame({ dealerId, settings, gameId });
  if (response.message) {
    return response;
  }
  return {};
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientFinishGameParameters } from '../types';

export const finishGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientFinishGameParameters
>('game/finishGameThunk', async ({ dealerId, gameId }) => {
  const response = await ApiService.finishGame({ dealerId, gameId });
  if (response.message) {
    return response;
  }
  return {};
});

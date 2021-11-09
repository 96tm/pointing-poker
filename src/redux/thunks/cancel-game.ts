import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientCancelGameParameters } from '../types';

export const cancelGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientCancelGameParameters
>('game/cancelGameThunk', async ({ dealerId, gameId }) => {
  const response = await ApiService.cancelGame({ dealerId, gameId });
  if (response.message) {
    return response;
  }
  return {};
});

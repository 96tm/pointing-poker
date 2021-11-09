import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientFinishRoundParameters } from '../types';

export const finishRoundThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientFinishRoundParameters
>('game/finishRoundThunk', async ({ dealerId, gameId }) => {
  const response = await ApiService.finishRound({
    dealerId,
    gameId,
  });
  return response;
});

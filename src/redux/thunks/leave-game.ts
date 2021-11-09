import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientLeaveGameParameters } from '../types';

export const leaveGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientLeaveGameParameters
>('game/leaveGameThunk', async ({ playerId, gameId }) => {
  const response = await ApiService.leaveGame({
    playerId,
    gameId,
  });
  if (response.message) {
    return response;
  }
  return {};
});

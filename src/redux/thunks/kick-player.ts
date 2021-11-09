import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientKickPlayerParameters } from '../types';

export const kickPlayerThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientKickPlayerParameters
>('game/kickPlayerThunk', async ({ dealerId, kickedPlayerId, gameId }) => {
  const response = await ApiService.kickPlayer({
    dealerId,
    kickedPlayerId,
    gameId,
  });
  if (response.message) {
    return response;
  }
  return {};
});

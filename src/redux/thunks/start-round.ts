import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { gameActions } from '../slices/game/game-slice';
import {
  IRequestResult,
  IClientStartRoundParameters,
  TGameStatus,
} from '../types';

export const startRoundThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientStartRoundParameters
>('game/startRoundThunk', async ({ dealerId, issueId, gameId }, thunkApi) => {
  const response = await ApiService.startRound({
    dealerId,
    issueId,
    gameId,
  });
  if (response) {
    return response;
  }
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.roundInProgress));
  return {};
});

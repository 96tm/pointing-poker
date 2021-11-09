import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { ICheckGameResponse } from '../../shared/services/types';
import { IClientCheckGameParameters } from '../types';

export const checkGameThunk = createAsyncThunk<
  ICheckGameResponse,
  IClientCheckGameParameters
>('game/checkGameThunk', async ({ gameId }) => {
  const response = (await ApiService.checkGame({
    gameId,
  })) as ICheckGameResponse;
  return response;
});

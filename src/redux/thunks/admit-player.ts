import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientAdmitPlayerParameters } from '../types';

export const admitPlayerThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientAdmitPlayerParameters
>('game/admitPlayerThunk', async ({ gameId }: IClientAdmitPlayerParameters) => {
  const response = await ApiService.admitPlayer({ gameId });
  return response;
});

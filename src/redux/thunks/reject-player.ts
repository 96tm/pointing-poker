import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientRejectPlayerParameters } from '../types';

export const rejectPlayerThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientRejectPlayerParameters
>(
  'game/rejectPlayerThunk',
  async ({ gameId }: IClientRejectPlayerParameters) => {
    const response = await ApiService.rejectPlayer({ gameId });
    return response;
  }
);

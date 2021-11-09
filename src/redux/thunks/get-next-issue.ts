import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientGetNextIssueParameters } from '../types';

export const getNextIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientGetNextIssueParameters
>('game/changeCurrentIssueThunk', async ({ dealerId, gameId }) => {
  const response = await ApiService.getNextIssue({ dealerId, gameId });
  if (response.message) {
    return response;
  }
  return {};
});

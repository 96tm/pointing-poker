import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientScoreIssueParameters } from '../types';

export const scoreIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientScoreIssueParameters
>('game/scoreIssueThunk', async ({ playerId, issueId, score, gameId }) => {
  const response = await ApiService.scoreIssue({
    playerId,
    issueId,
    score,
    gameId,
  });
  return response;
});

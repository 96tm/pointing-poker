import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { gameActions } from '../slices/game/game-slice';
import { IRequestResult, IClientDeleteIssueParameters } from '../types';

export const deleteIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientDeleteIssueParameters
>(
  'game/deleteIssueThunk',
  async ({ dealerId, deletedIssueId, gameId }, thunkApi) => {
    const response = await ApiService.deleteIssue({
      dealerId,
      deletedIssueId,
      gameId,
    });
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(gameActions.deleteIssue(deletedIssueId));
    return {};
  }
);

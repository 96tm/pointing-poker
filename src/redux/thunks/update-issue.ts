import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { gameActions } from '../slices/game/game-slice';
import { IRequestResult, IClientUpdateIssueParameters } from '../types';

export const updateIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientUpdateIssueParameters
>(
  'game/updateIssueThunk',
  async ({ dealerId, updatedIssue, gameId }, thunkApi) => {
    const response = await ApiService.updateIssue({
      dealerId,
      updatedIssue,
      gameId,
    });
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(
      gameActions.updateIssue({
        issueId: updatedIssue.id,
        updatedIssue: updatedIssue,
      })
    );
    return {};
  }
);

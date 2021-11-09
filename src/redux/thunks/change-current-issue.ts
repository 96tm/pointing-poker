import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { gameActions } from '../slices/game/game-slice';
import { IRequestResult, IClientChangeCurrentIssueParameters } from '../types';

export const changeCurrentIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientChangeCurrentIssueParameters
>(
  'game/changeCurrentIssueThunk',
  async ({ dealerId, issueId, gameId }, thunkApi) => {
    const response = await ApiService.changeCurrentIssue({
      dealerId,
      issueId,
      gameId,
    });
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(gameActions.changeCurrentIssueId(issueId));
    return {};
  }
);

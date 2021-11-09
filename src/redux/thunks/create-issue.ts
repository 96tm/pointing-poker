import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { gameActions } from '../slices/game/game-slice';
import { IRequestResult, IClientCreateIssueParameters, Issue } from '../types';

export const createIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientCreateIssueParameters
>(
  'game/createIssueThunk',
  async ({ dealerId, addedIssue, gameId }, thunkApi) => {
    const response = await ApiService.createIssue({
      dealerId,
      addedIssue,
      gameId,
    });
    if (response.message) {
      return response;
    }
    const createdIssue = new Issue({
      ...addedIssue,
      id: response.issueId,
    }).toObject();
    thunkApi.dispatch(gameActions.createIssue(createdIssue));
    return {};
  }
);

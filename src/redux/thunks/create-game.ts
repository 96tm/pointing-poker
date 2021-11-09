import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { ICreateGameResponse } from '../../shared/services/types';
import { appActions } from '../slices/app/app-slice';
import { currentUserActions } from '../slices/current-user/current-user-slice';
import { gameActions } from '../slices/game/game-slice';
import {
  ICreateGameRequestResult,
  IClientCreateGameParameters,
  User,
  TUserRole,
  TGameStatus,
} from '../types';
import { InfoMessage } from '../types/info-message';

export const createGameThunk = createAsyncThunk<
  Partial<ICreateGameRequestResult>,
  IClientCreateGameParameters
>('game/createGameThunk', async ({ dealerInfo }, thunkApi) => {
  const response = await ApiService.createGame({ dealerInfo });
  if (response.message) {
    return response;
  }
  const { gameId, dealerId } = response as ICreateGameResponse;
  const dealer = new User({
    ...dealerInfo,
    id: dealerId,
    role: TUserRole.dealer,
  }).toObject();
  thunkApi.dispatch(currentUserActions.changeCurrentUser(dealer));
  thunkApi.dispatch(gameActions.changeId(gameId));
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.lobby));
  thunkApi.dispatch(gameActions.changePlayers([dealer]));
  thunkApi.dispatch(
    appActions.addOneInfoMessage(new InfoMessage('Game created').toObject())
  );
  return { dealer, gameId };
});

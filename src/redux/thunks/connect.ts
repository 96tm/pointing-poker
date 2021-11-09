import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IResponse, IConnectResponse } from '../../shared/services/types';
import { appActions } from '../slices/app/app-slice';

export const connectThunk = createAsyncThunk<IResponse, void>(
  'app/connectThunk',
  async (_, thunkApi) => {
    const response = (await ApiService.connect()) as IConnectResponse;
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(
      appActions.changeConnectionStatus(response.connectionStatus)
    );
    thunkApi.dispatch(appActions.changeSocketId(response.socketId));
    return response;
  }
);

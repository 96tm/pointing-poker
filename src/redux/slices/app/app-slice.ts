import { createSlice } from '@reduxjs/toolkit';
import { appReducers } from '../../reducers';
import { IApp } from '../../types';

const initialAppState: IApp = {
  isConnected: false,
  infoMessages: [],
  socketId: '',
  isLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: appReducers,
});

export const appActions = appSlice.actions;

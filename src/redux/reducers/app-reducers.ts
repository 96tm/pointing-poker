import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IApp } from '../types';
import { IInfoMessage } from '../types/info-message';

const changeConnectionStatus: CaseReducer<IApp, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isConnected = action.payload;
};

const changeSocketId: CaseReducer<IApp, PayloadAction<string>> = (
  state,
  action
) => {
  state.socketId = action.payload;
};

const changeInfoMessages: CaseReducer<IApp, PayloadAction<IInfoMessage[]>> = (
  state,
  action
) => {
  state.infoMessages = action.payload;
};

const addOneInfoMessage: CaseReducer<IApp, PayloadAction<IInfoMessage>> = (
  state,
  action
) => {
  state.infoMessages.push(action.payload);
};

const removeOneInfoMessage: CaseReducer<IApp, PayloadAction<number>> = (
  state,
  action
) => {
  state.infoMessages = state.infoMessages.filter(
    (message) => message.id !== action.payload
  );
};

const changeIsLoading: CaseReducer<IApp, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isLoading = action.payload;
};

export const appReducers = {
  changeConnectionStatus,
  changeInfoMessages,
  addOneInfoMessage,
  removeOneInfoMessage,
  changeSocketId,
  changeIsLoading,
};

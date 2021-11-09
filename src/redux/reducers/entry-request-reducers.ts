import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { IUser } from '../types';
import { IEntryRequests } from '../types/entry-request';

const pushEntryRequest: CaseReducer<
  IEntryRequests,
  PayloadAction<Partial<IUser>>
> = (state, action) => {
  state.entryRequests = state.entryRequests.concat(action.payload);
};

const popEntryRequest: CaseReducer<IEntryRequests, AnyAction> = (state) => {
  state.entryRequests = state.entryRequests.slice(1);
};

const resetEntryRequests: CaseReducer<IEntryRequests, AnyAction> = (state) => {
  state.entryRequests = [];
};

export const entryRequestsReducers = {
  pushEntryRequest,
  popEntryRequest,
  resetEntryRequests,
};

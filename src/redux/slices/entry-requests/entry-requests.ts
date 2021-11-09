import { createSlice } from '@reduxjs/toolkit';
import { entryRequestsReducers } from '../../reducers';
import { IEntryRequests } from '../../types/entry-request';

const initialEntryRequestsState: IEntryRequests = {
  entryRequests: [],
};
export const entryRequestsSlice = createSlice({
  name: 'entryRequests',
  initialState: { ...initialEntryRequestsState },
  reducers: entryRequestsReducers,
});

export const entryRequestsActions = entryRequestsSlice.actions;

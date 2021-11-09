import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IEntryRequests } from '../types/entry-request';

const selectRequests = (state: RootState): IEntryRequests =>
  state.entryRequests;

const selectFirstRequest = createSelector(
  selectRequests,
  (state) => state.entryRequests[0]
);

export const entryRequestSelectors = {
  selectRequests,
  selectFirstRequest,
};

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser, TUserRole } from '../types';

const selectCurrentUser = (state: RootState): IUser => state.currentUser;

const selectIsDealer = createSelector(selectCurrentUser, (currentUser) => {
  return currentUser.role === TUserRole.dealer;
});

export const currentUserSelectors = {
  selectCurrentUser,
  selectIsDealer,
};

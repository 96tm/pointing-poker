import { AnyAction, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IUser, User } from '../types';

const changeCurrentUser: CaseReducer<IUser, PayloadAction<Partial<IUser>>> = (
  state,
  action
) => {
  Object.assign(state, action.payload);
};

const resetCurrentUser: CaseReducer<IUser, AnyAction> = (state) => {
  Object.assign(state, new User().toObject());
};

export const currentUserReducers = {
  changeCurrentUser,
  resetCurrentUser,
};

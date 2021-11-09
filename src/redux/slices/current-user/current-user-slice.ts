import { createSlice } from '@reduxjs/toolkit';
import { currentUserReducers } from '../../reducers';
import { User, IUser } from '../../types';

const initialState: IUser = new User().toObject();

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: currentUserReducers,
});

export const currentUserActions = currentUserSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
import { gameReducers } from '../../reducers';
import { Game } from '../../types';

export const initialState = new Game().toObject();

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: gameReducers,
});

export const gameActions = gameSlice.actions;

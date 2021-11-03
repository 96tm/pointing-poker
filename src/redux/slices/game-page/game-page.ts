import { createSlice } from '@reduxjs/toolkit';
import { gamePageReducers } from '../../reducers';
import { IGamePage } from '../../types/game-page';

const initialGamePageState: IGamePage = {
  timer: { minutes: 0, seconds: 0 },
  isSidebarShown: true,
};

export const gamePageSlice = createSlice({
  name: 'gamePage',
  initialState: { ...initialGamePageState },
  reducers: gamePageReducers,
});

export const gamePageActions = gamePageSlice.actions;

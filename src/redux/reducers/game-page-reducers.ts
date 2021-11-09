import { AnyAction, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ITimer } from '../types';
import { IGamePage } from '../types/game-page';

const changeTimer: CaseReducer<IGamePage, PayloadAction<ITimer>> = (
  state,
  action
) => {
  state.timer = action.payload;
};

const toggleSideBar: CaseReducer<IGamePage, AnyAction> = (state) => {
  state.isSidebarShown = !state.isSidebarShown;
};

export const gamePageReducers = {
  changeTimer,
  toggleSideBar,
};

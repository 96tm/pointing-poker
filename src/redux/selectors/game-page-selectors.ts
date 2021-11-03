import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { IGamePage } from '../types/game-page';

const selectGamePage = (state: RootState): IGamePage => state.gamePage;

const selectTimer = createSelector(
  selectGamePage,
  (gamePage) => gamePage.timer
);

const selectIsSidebarShown = createSelector(
  selectGamePage,
  (gamePage) => gamePage.isSidebarShown
);

export const gamePageSelectors = {
  selectTimer,
  selectIsSidebarShown,
};

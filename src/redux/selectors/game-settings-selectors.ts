import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IGameSettings } from '../types';

const selectGameSettings = (state: RootState): IGameSettings =>
  state.gameSettings;

const selectSettings = createSelector(
  selectGameSettings,
  (gameSettings) => gameSettings
);

export const gameSettingsSelectors = {
  selectSettings,
};

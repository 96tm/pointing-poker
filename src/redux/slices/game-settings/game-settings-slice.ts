import { createSlice } from '@reduxjs/toolkit';
import { IGameSettings, GameSettings } from '../../types';
import { gameSettingsReducers } from '../../reducers';

const initialState: IGameSettings = new GameSettings().toObject();

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState: initialState,
  reducers: gameSettingsReducers,
});

export const gameSettingsActions = gameSettingsSlice.actions;

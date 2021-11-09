import { createSlice } from '@reduxjs/toolkit';
import { lobbyPageReducers } from '../../reducers';
import { ILobbyPage } from '../../types/lobby-page';

const initialLobbyPageState: ILobbyPage = {
  isSideBarShown: false,
  wasKicked: false,
  isVotingInProgress: false,
};

export const lobbyPageSlice = createSlice({
  name: 'lobbyPage',
  initialState: { ...initialLobbyPageState },
  reducers: lobbyPageReducers,
});

export const lobbyPageActions = lobbyPageSlice.actions;

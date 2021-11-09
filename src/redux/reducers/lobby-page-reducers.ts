import { AnyAction, CaseReducer } from '@reduxjs/toolkit';
import { ILobbyPage } from '../types/lobby-page';

const toggleSideBar: CaseReducer<ILobbyPage, AnyAction> = (state) => {
  state.isSideBarShown = !state.isSideBarShown;
};

const toggleKicked: CaseReducer<ILobbyPage, AnyAction> = (state) => {
  state.wasKicked = !state.wasKicked;
};

export const lobbyPageReducers = {
  toggleSideBar,
  toggleKicked,
};

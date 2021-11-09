import { createAction } from '@reduxjs/toolkit';
import { ILobbyPage } from '../../types/lobby-page';
import { lobbyPageActions, lobbyPageSlice } from './lobby-page';

describe('Lobby page slice', () => {
  const initialState: ILobbyPage = {
    isSideBarShown: false,
    wasKicked: false,
    isVotingInProgress: false,
  };

  test('should handle initial state', () => {
    expect(lobbyPageSlice.reducer(undefined, createAction(''))).toEqual({
      ...initialState,
    });
  });

  test('should handle toggleSideBar', () => {
    expect(
      lobbyPageSlice.reducer(undefined, lobbyPageActions.toggleSideBar())
    ).toEqual({
      ...initialState,
      isSideBarShown: true,
    });
  });
});

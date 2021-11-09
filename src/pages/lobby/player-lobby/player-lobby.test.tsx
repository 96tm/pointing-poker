import React from 'react';
import {
  currentUserSlice,
  currentUserActions,
} from '../../../redux/slices/current-user/current-user-slice';
import { gameSlice, gameActions } from '../../../redux/slices/game/game-slice';
import { IGame, TGameStatus } from '../../../redux/types';
import { mockDealer, mockIssue, mockCurrentUser1 } from '../../../shared/mocks';

import { render } from '../../../shared/test-utils';
import PlayerLobby from './player-lobby';

describe('render page PlayerLobby', () => {
  let gameState: IGame;
  beforeEach(() => {
    gameState = gameSlice.reducer(
      undefined,
      gameActions.changePlayers([mockDealer])
    );
    gameState = gameSlice.reducer(
      gameState,
      gameActions.changeStatus(TGameStatus.lobby)
    );
  });

  test('should handle dealer', () => {
    const page = render(<PlayerLobby />, {
      preloadedState: { game: gameState },
    });
    page.getByText(`${mockDealer.firstName} ${mockDealer.lastName}`);
  });

  test('should handle issue', () => {
    gameState = gameSlice.reducer(
      gameState,
      gameActions.changeIssues([mockIssue])
    );
    const page = render(<PlayerLobby />, {
      preloadedState: { game: gameState },
    });
    page.getByText(`(issues: ${mockIssue.title}, )`);
  });

  test('should handle currentUser', () => {
    const currentGameState = gameSlice.reducer(
      gameState,
      gameActions.changePlayers([mockDealer, mockCurrentUser1])
    );
    const currenUserState = currentUserSlice.reducer(
      undefined,
      currentUserActions.changeCurrentUser(mockCurrentUser1)
    );
    const page = render(<PlayerLobby />, {
      preloadedState: { currentUser: currenUserState, game: currentGameState },
    });
    page.getByText(
      `${mockCurrentUser1.firstName} ${mockCurrentUser1.lastName}`
    );
  });
});

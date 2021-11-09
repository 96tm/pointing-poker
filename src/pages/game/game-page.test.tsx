import React from 'react';
import {
  currentUserActions,
  currentUserSlice,
} from '../../redux/slices/current-user/current-user-slice';
import { gameActions, gameSlice } from '../../redux/slices/game/game-slice';
import { store } from '../../redux/store';
import { TUserRole, User } from '../../redux/types';
import { render } from '../../shared/test-utils';
import { GamePage } from './game-page';

describe('Game page', () => {
  const dealer = new User({
    firstName: 'dealerFirstName',
    role: TUserRole.dealer,
  });
  const gameState = gameSlice.reducer(
    undefined,
    gameActions.changePlayers([dealer])
  );
  const currentUserState = currentUserSlice.reducer(
    undefined,
    currentUserActions.changeCurrentUser(dealer)
  );
  test('Should render component', () => {
    render(<GamePage />, {
      preloadedState: {
        ...store.getState(),
        currentUser: currentUserState,
        game: gameState,
      },
    });
  });
});

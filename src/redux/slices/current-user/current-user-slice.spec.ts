import { createAction } from '@reduxjs/toolkit';
import { currentUserSlice, currentUserActions } from './current-user-slice';
import { User, TUserRole } from '../../types';

describe('app slice', () => {
  const initialState = new User();

  const testUser1 = new User({
    id: 'testId1',
    firstName: 'Bruce',
    role: TUserRole.player,
  });

  const testUser2 = new User({
    id: 'testId2',
    firstName: 'Bruce',
    role: TUserRole.player,
  });

  test('should handle initial state', () => {
    expect(currentUserSlice.reducer(undefined, createAction(''))).toEqual(
      expect.objectContaining(initialState)
    );
  });

  test('should handle changeCurrentUser', () => {
    expect(
      currentUserSlice.reducer(
        undefined,
        currentUserActions.changeCurrentUser(testUser1)
      )
    ).toEqual(expect.objectContaining({ id: testUser1.id }));
    expect(
      currentUserSlice.reducer(
        undefined,
        currentUserActions.changeCurrentUser(testUser1)
      )
    ).not.toEqual(expect.objectContaining({ currentUser: testUser2 }));
  });
});

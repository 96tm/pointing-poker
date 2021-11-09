import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { IGame, TUserRole } from '../types';

const selectGame = (state: RootState): IGame => state.game;

const selectId = createSelector(selectGame, (game) => game.id);

const selectStatus = createSelector(selectGame, (game) => game.status);

const selectDealer = createSelector(selectGame, (game) => {
  const players = game.players;
  return players.find((player) => player.role === TUserRole.dealer);
});

const selectPlayers = createSelector(selectGame, (game) => game.players);

const selectIssues = createSelector(selectGame, (game) => game.issues);

const selectMessages = createSelector(selectGame, (game) => game.messages);

const selectCurrentIssueId = createSelector(
  selectGame,
  (game) => game.currentIssueId
);

const selectCurrentIssue = createSelector(selectGame, (game) =>
  game.issues.find((issue) => issue.id === game.currentIssueId)
);

export const gameSelectors = {
  selectGame,
  selectId,
  selectStatus,
  selectDealer,
  selectPlayers,
  selectIssues,
  selectMessages,
  selectCurrentIssueId,
  selectCurrentIssue,
};

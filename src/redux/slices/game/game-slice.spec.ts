import { createAction } from '@reduxjs/toolkit';
import { gameSlice, gameActions } from './game-slice';
import { Game, IGame, TGameStatus, Issue, Message, User } from '../../types';

describe('game slice', () => {
  const initialState: IGame = new Game();
  const message1 = new Message({
    id: '',
    userId: 'userId1',
    message: 'text',
  }).toObject();
  const message2 = new Message({
    id: '',
    userId: 'userId2',
    message: 'text',
  }).toObject();
  const player1 = new User({ id: 'player1' });
  const player2 = new User({ id: 'player2' });
  const issue1 = new Issue({
    id: 'testId1',
    title: 'testTitle1',
    link: 'testLink1',
    lastRoundResult: {
      [player1.id]: 20,
      [player2.id]: 5,
    },
  });
  const issue2 = new Issue({
    id: 'testId2',
    title: 'testTitle2',
    link: 'testLink2',
  });

  test('should handle initial state', () => {
    expect(gameSlice.reducer(undefined, createAction(''))).toEqual({
      ...initialState,
    });
  });

  test('should handle changeId', () => {
    expect(gameSlice.reducer(undefined, gameActions.changeId('new'))).toEqual({
      ...initialState,
      id: 'new',
    });
  });

  test('should handle changeStatus', () => {
    expect(
      gameSlice.reducer(
        undefined,
        gameActions.changeStatus(TGameStatus.roundInProgress)
      )
    ).toEqual({
      ...initialState,
      status: TGameStatus.roundInProgress,
    });
  });

  test('should handle changeCurrentIssueId', () => {
    expect(
      gameSlice.reducer(undefined, gameActions.changeCurrentIssueId('new'))
    ).toEqual({
      ...initialState,
      currentIssueId: 'new',
    });
  });

  test('should handle addPlayer', () => {
    const gameState = gameSlice.reducer(
      undefined,
      gameActions.addPlayer(player1)
    );
    expect(gameState.players).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: player1.id })])
    );
  });

  test('should handle resetGame', () => {
    const gameState = gameSlice.reducer(
      {
        ...initialState,
        players: [player1, player2],
        issues: [issue1],
        messages: [message1],
      },
      createAction('')
    );
    expect(gameState).not.toEqual(expect.objectContaining({ ...initialState }));
    expect(
      gameSlice.reducer({ ...gameState }, gameActions.resetGame())
    ).toEqual(
      expect.objectContaining({ ...initialState, status: TGameStatus.inactive })
    );
  });

  test('should handle deletePlayer', () => {
    const gameState = gameSlice.reducer(
      { ...initialState, players: [player1, player2] },
      gameActions.deletePlayer(player1.id)
    );
    expect(gameState.players).toEqual(
      expect.arrayContaining([expect.objectContaining(player2)])
    );
    expect(gameState.players).not.toEqual(
      expect.arrayContaining([expect.objectContaining(player1)])
    );
  });

  test('should handle changePlayers', () => {
    gameSlice.reducer(
      { ...initialState, players: [player2] },
      createAction('')
    );
    const gameState = gameSlice.reducer(
      undefined,
      gameActions.changePlayers([player1])
    );
    expect(gameState.players).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: player1.id })])
    );
    expect(gameState.players).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: player2.id })])
    );
  });

  test('should handle createIssue', () => {
    const gameState = gameSlice.reducer(
      undefined,
      gameActions.createIssue(issue1)
    );
    expect(gameState.issues).toEqual(
      expect.arrayContaining([expect.objectContaining(issue1)])
    );
    expect(gameState.issues).not.toEqual(
      expect.arrayContaining([expect.objectContaining(issue2)])
    );
  });

  test('should handle updateIssue', () => {
    const gameState = gameSlice.reducer(
      { ...initialState, issues: [issue1] },
      gameActions.updateIssue({ issueId: issue1.id, updatedIssue: issue2 })
    );
    expect(gameState.issues).toEqual(
      expect.arrayContaining([expect.objectContaining(issue2)])
    );
    expect(gameState.issues).not.toEqual(
      expect.arrayContaining([expect.objectContaining(issue1)])
    );
  });

  test('should update issue score', () => {
    expect(
      gameSlice.reducer({ ...initialState, issues: [issue1] }, createAction(''))
        .issues
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          lastRoundResult: expect.objectContaining({ player1: 20 }),
        }),
      ])
    );
    const gameState = gameSlice.reducer(
      { ...initialState, issues: [issue1] },
      gameActions.scoreIssue({
        playerId: player1.id,
        issueId: issue1.id,
        score: 10,
      })
    );
    expect(gameState.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          lastRoundResult: expect.objectContaining({ player1: 10 }),
        }),
      ])
    );
    expect.arrayContaining([
      expect.objectContaining({
        lastRoundResult: expect.objectContaining({ player2: 5 }),
      }),
    ]);
  });

  test('should handle deleteIssue', () => {
    const gameState = gameSlice.reducer(
      { ...initialState, issues: [issue1, issue2] },
      gameActions.deleteIssue(issue1.id)
    );
    expect(gameState.issues).toEqual(
      expect.arrayContaining([expect.objectContaining(issue2)])
    );
    expect(gameState.issues).not.toEqual(
      expect.arrayContaining([expect.objectContaining(issue1)])
    );
  });

  test('should handle changeIssues', () => {
    gameSlice.reducer({ ...initialState, issues: [issue1] }, createAction(''));
    const gameState = gameSlice.reducer(
      undefined,
      gameActions.changeIssues([issue2])
    );
    expect(gameState.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: issue2.id })])
    );
    expect(gameState.issues).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: issue1.id })])
    );
  });

  test('should handle postMessage', () => {
    const gameState = gameSlice.reducer(
      undefined,
      gameActions.postMessage(message1)
    );
    expect(gameState.messages).toEqual(
      expect.arrayContaining([expect.objectContaining(message1)])
    );
    expect(gameState.messages).not.toEqual(
      expect.arrayContaining([expect.objectContaining(message2)])
    );
  });

  test('should handle changeMessages', () => {
    gameSlice.reducer(
      { ...initialState, messages: [message2] },
      createAction('')
    );
    const gameState = gameSlice.reducer(
      undefined,
      gameActions.changeMessages([message1])
    );
    expect(gameState.messages).toEqual(
      expect.arrayContaining([expect.objectContaining(message1)])
    );
    expect(gameState.messages).not.toEqual(
      expect.arrayContaining([expect.objectContaining(message2)])
    );
  });
});

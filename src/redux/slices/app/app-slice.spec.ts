import { createAction } from '@reduxjs/toolkit';
import { appSlice, appActions } from './app-slice';
import { IApp } from '../../types';
import { InfoMessage } from '../../types/info-message';

describe('app slice', () => {
  const initialState: IApp = {
    isConnected: false,
    infoMessages: [],
    socketId: '',
    isLoading: false,
  };

  test('should handle initial state', () => {
    expect(appSlice.reducer(undefined, createAction(''))).toEqual({
      ...initialState,
    });
  });

  test('should handle changeInfoMessages', () => {
    const state = appSlice.reducer(
      undefined,
      appActions.changeInfoMessages([new InfoMessage('message')])
    );
    expect(state.infoMessages).toEqual(
      expect.arrayContaining([expect.objectContaining({ text: 'message' })])
    );
  });

  test('should handle addOneInfoMessage', () => {
    const state = appSlice.reducer(
      undefined,
      appActions.addOneInfoMessage(new InfoMessage('message'))
    );
    expect(state.infoMessages).toEqual(
      expect.arrayContaining([expect.objectContaining({ text: 'message' })])
    );
  });

  test('should handle removeOneInfoMessage', () => {
    const message1 = new InfoMessage('message1');
    const message2 = new InfoMessage('message2');
    const state = appSlice.reducer(
      undefined,
      appActions.changeInfoMessages([message1, message2])
    );

    expect(
      appSlice.reducer(state, appActions.removeOneInfoMessage(message1.id))
        .infoMessages
    ).toEqual(
      expect.arrayContaining([expect.objectContaining({ text: 'message2' })])
    );
    expect(
      appSlice.reducer(state, appActions.removeOneInfoMessage(message1.id))
        .infoMessages
    ).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ text: 'message1' })])
    );
  });

  test('should handle changeConnectionStatus', () => {
    expect(
      appSlice.reducer(undefined, appActions.changeConnectionStatus(true))
    ).toEqual({
      ...initialState,
      isConnected: true,
    });
  });
});

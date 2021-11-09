import { AnyAction, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IVotingKick } from '../types/voting-kick';

const changeVotingKick: CaseReducer<
  IVotingKick,
  PayloadAction<Partial<IVotingKick>>
> = (state, action) => {
  Object.assign(state, action.payload);
};

const resetVotingKick: CaseReducer<IVotingKick, AnyAction> = (state) => {
  state.kickedPlayerId = '';
  state.votingPlayerId = '';
};

export const votingKickReducers = {
  changeVotingKick,
  resetVotingKick,
};

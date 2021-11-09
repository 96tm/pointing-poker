import { createSlice } from '@reduxjs/toolkit';
import { votingKickReducers } from '../../reducers';
import { IVotingKick } from '../../types/voting-kick';

const initialVotingKickState: IVotingKick = {
  votingPlayerId: '',
  kickedPlayerId: '',
};

export const votingKickSlice = createSlice({
  name: 'votingKick',
  initialState: { ...initialVotingKickState },
  reducers: votingKickReducers,
});

export const votingKickActions = votingKickSlice.actions;

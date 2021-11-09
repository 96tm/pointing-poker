import { RootState } from '../store';
import { IVotingKick } from '../types/voting-kick';

const selectVotingKick = (state: RootState): IVotingKick => state.votingKick;

export const votingKickSelectors = {
  selectVotingKick,
};

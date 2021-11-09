import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientKickPlayerVoteParameters } from '../types';

export const startVotingToKickThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientKickPlayerVoteParameters
>(
  'game/startVotingToKickThunk',
  async ({ votingPlayerId, kickedPlayerId, gameId }) => {
    const response = await ApiService.startVotingToKick({
      votingPlayerId,
      kickedPlayerId,
      gameId,
    });
    return response;
  }
);

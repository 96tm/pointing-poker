import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import { IRequestResult, IClientVoteToKickParameters } from '../types';

export const voteToKickThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientVoteToKickParameters
>(
  'game/voteToKickThunk',
  async ({ votingPlayerId, kickedPlayerId, gameId, accept }) => {
    const response = await ApiService.voteToKick({
      votingPlayerId,
      kickedPlayerId,
      gameId,
      accept,
    });
    return response;
  }
);

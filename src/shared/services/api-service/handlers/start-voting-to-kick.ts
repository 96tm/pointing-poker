import { IClientStartVotingToKickParameters } from '../../../../redux/types';
import { IResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiStartVotingToKick({
  votingPlayerId,
  kickedPlayerId,
  gameId,
}: IClientStartVotingToKickParameters): Promise<IResponse> {
  const response = await asyncEmit<
    IClientStartVotingToKickParameters,
    IResponse
  >('startVotingToKick', { votingPlayerId, kickedPlayerId, gameId });
  return response;
}

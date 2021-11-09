import { IClientVoteToKickParameters } from '../../../../redux/types';
import { IResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiVoteToKick({
  votingPlayerId,
  kickedPlayerId,
  gameId,
  accept,
}: IClientVoteToKickParameters): Promise<IResponse> {
  const response = await asyncEmit<IClientVoteToKickParameters, IResponse>(
    'voteToKick',
    { votingPlayerId, kickedPlayerId, gameId, accept }
  );
  return response;
}

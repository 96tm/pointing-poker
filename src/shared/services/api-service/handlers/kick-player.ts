import { IClientKickPlayerParameters } from '../../../../redux/types';
import { IKickPlayerResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiKickPlayer({
  dealerId,
  kickedPlayerId,
  gameId,
}: IClientKickPlayerParameters): Promise<Partial<IKickPlayerResponse>> {
  const response = await asyncEmit<
    IClientKickPlayerParameters,
    Partial<IKickPlayerResponse>
  >('kickPlayer', { dealerId, kickedPlayerId, gameId });
  return response;
}

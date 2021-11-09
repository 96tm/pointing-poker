import { IClientLeaveGameParameters } from '../../../../redux/types';
import { ILeaveGameResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiLeaveGame({
  playerId,
  gameId,
}: IClientLeaveGameParameters): Promise<Partial<ILeaveGameResponse>> {
  const response = await asyncEmit<
    IClientLeaveGameParameters,
    Partial<ILeaveGameResponse>
  >('leaveGame', { playerId, gameId });
  return response;
}

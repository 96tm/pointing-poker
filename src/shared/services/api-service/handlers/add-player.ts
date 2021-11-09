import { IClientAddPlayerParameters } from '../../../../redux/types';
import { IAddPlayerResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiAddPlayer({
  addedPlayer,
  gameId,
}: IClientAddPlayerParameters): Promise<Partial<IAddPlayerResponse>> {
  const response: Partial<IAddPlayerResponse> = await asyncEmit<
    IClientAddPlayerParameters,
    Partial<IAddPlayerResponse>
  >('addPlayer', { addedPlayer, gameId });
  return response;
}

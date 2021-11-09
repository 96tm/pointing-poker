import { IClientStartGameParameters } from '../../../../redux/types';
import { IResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiStartGame({
  dealerId,
  settings,
  gameId,
}: IClientStartGameParameters): Promise<IResponse> {
  const response = await asyncEmit<IClientStartGameParameters, IResponse>(
    'startGame',
    { dealerId, gameId, settings }
  );
  return response;
}

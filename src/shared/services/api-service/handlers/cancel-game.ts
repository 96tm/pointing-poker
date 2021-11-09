import { IClientCancelGameParameters } from '../../../../redux/types';
import { IResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiCancelGame({
  dealerId,
  gameId,
}: IClientCancelGameParameters): Promise<IResponse> {
  const response = await asyncEmit<IClientCancelGameParameters, IResponse>(
    'cancelGame',
    { dealerId, gameId }
  );
  return response;
}

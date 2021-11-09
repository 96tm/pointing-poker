import { IClientFinishGameParameters } from '../../../../redux/types';
import { IResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiFinishGame({
  dealerId,
  gameId,
}: IClientFinishGameParameters): Promise<IResponse> {
  const response = await asyncEmit<IClientFinishGameParameters, IResponse>(
    'finishGame',
    { dealerId, gameId }
  );
  return response;
}

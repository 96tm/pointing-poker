import { IClientFinishRoundParameters } from '../../../../redux/types';
import { IResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiFinishRound({
  dealerId,
  gameId,
}: IClientFinishRoundParameters): Promise<Partial<IResponse>> {
  const response = await asyncEmit<
    IClientFinishRoundParameters,
    Partial<IResponse>
  >('finishRound', { dealerId, gameId });
  return response;
}

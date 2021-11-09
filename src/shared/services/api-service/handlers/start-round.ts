import { IClientStartRoundParameters } from '../../../../redux/types';
import { IStartRoundResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiStartRound({
  dealerId,
  issueId,
  gameId,
}: IClientStartRoundParameters): Promise<Partial<IStartRoundResponse>> {
  const response = await asyncEmit<
    IClientStartRoundParameters,
    Partial<IStartRoundResponse>
  >('startRound', { dealerId, issueId, gameId });
  return response;
}

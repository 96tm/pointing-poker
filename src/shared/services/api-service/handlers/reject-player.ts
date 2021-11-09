import { IClientRejectPlayerParameters } from '../../../../redux/types';
import { IResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiRejectPlayer({
  gameId,
}: IClientRejectPlayerParameters): Promise<Partial<IResponse>> {
  const response: Partial<IResponse> = await asyncEmit<
    IClientRejectPlayerParameters,
    Partial<IResponse>
  >('rejectPlayer', { gameId });
  return response;
}

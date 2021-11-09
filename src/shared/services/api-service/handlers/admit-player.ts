import { IClientAdmitPlayerParameters } from '../../../../redux/types';
import { IResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiAdmitPlayer({
  gameId,
}: IClientAdmitPlayerParameters): Promise<Partial<IResponse>> {
  const response: Partial<IResponse> = await asyncEmit<
    IClientAdmitPlayerParameters,
    Partial<IResponse>
  >('admitPlayer', { gameId });
  return response;
}

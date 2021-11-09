import { IClientCreateGameParameters } from '../../../../redux/types';
import { ICreateGameResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiCreateGame(
  dealerInfo: IClientCreateGameParameters
): Promise<Partial<ICreateGameResponse>> {
  const response: Partial<ICreateGameResponse> = await asyncEmit<
    IClientCreateGameParameters,
    Partial<ICreateGameResponse>
  >('createGame', dealerInfo);
  return response;
}

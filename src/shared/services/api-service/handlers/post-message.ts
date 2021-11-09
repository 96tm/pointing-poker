import { IClientPostMessageParameters } from '../../../../redux/types';
import { IPostMessageResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiPostMessage({
  message,
  gameId,
}: IClientPostMessageParameters): Promise<Partial<IPostMessageResponse>> {
  const response = await asyncEmit<
    IClientPostMessageParameters,
    Partial<IPostMessageResponse>
  >('postMessage', { message, gameId });
  return response;
}

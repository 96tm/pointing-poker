import { IClientGetNextIssueParameters } from '../../../../redux/types';
import { IGetNextIssueResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiGetNextIssue({
  dealerId,
  gameId,
}: IClientGetNextIssueParameters): Promise<Partial<IGetNextIssueResponse>> {
  const response = await asyncEmit<
    IClientGetNextIssueParameters,
    Partial<IGetNextIssueResponse>
  >('getNextIssue', { dealerId, gameId });
  return response;
}

import { IClientDeleteIssueParameters } from '../../../../redux/types';
import { IResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiDeleteIssue({
  dealerId,
  deletedIssueId,
  gameId,
}: IClientDeleteIssueParameters): Promise<IResponse> {
  const response = await asyncEmit<IClientDeleteIssueParameters, IResponse>(
    'deleteIssue',
    { dealerId, deletedIssueId, gameId }
  );
  return response;
}

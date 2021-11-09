import { IClientUpdateIssueParameters } from '../../../../redux/types';
import { IResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiUpdateIssue({
  dealerId,
  updatedIssue,
  gameId,
}: IClientUpdateIssueParameters): Promise<IResponse> {
  const response = await asyncEmit<IClientUpdateIssueParameters, IResponse>(
    'updateIssue',
    { dealerId, updatedIssue, gameId }
  );
  return response;
}

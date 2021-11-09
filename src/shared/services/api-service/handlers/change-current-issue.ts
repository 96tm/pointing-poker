import { IClientChangeCurrentIssueParameters } from '../../../../redux/types';
import { IChangeCurrentIssueResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiChangeCurrentIssue({
  dealerId,
  issueId,
  gameId,
}: IClientChangeCurrentIssueParameters): Promise<
  Partial<IChangeCurrentIssueResponse>
> {
  const response = await asyncEmit<
    IClientChangeCurrentIssueParameters,
    Partial<IChangeCurrentIssueResponse>
  >('changeCurrentIssue', { dealerId, issueId, gameId });
  return response;
}

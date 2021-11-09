import { IClientCreateIssueParameters } from '../../../../redux/types';
import { ICreateIssueResponse, ICreateGameResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiCreateIssue({
  dealerId,
  addedIssue,
  gameId,
}: IClientCreateIssueParameters): Promise<Partial<ICreateIssueResponse>> {
  const response = await asyncEmit<
    IClientCreateIssueParameters,
    Partial<ICreateGameResponse>
  >('createIssue', { dealerId, addedIssue, gameId });
  return response;
}

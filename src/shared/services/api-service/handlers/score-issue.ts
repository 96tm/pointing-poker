import { IClientScoreIssueParameters } from '../../../../redux/types';
import { IResponse, IStartRoundResponse } from '../../types';
import { asyncEmit } from '../async-emit';

export async function apiScoreIssue({
  playerId,
  issueId,
  score,
  gameId,
}: IClientScoreIssueParameters): Promise<Partial<IResponse>> {
  const response = await asyncEmit<
    IClientScoreIssueParameters,
    Partial<IStartRoundResponse>
  >('scoreIssue', { playerId, issueId, gameId, score });
  return response;
}

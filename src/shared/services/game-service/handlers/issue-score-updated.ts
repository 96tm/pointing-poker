import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { IIssueScoreUpdatedResponseWS } from '../../types';

export default function issueScoreUpdated({
  issueId,
  roundResult,
  totalScore,
}: IIssueScoreUpdatedResponseWS): void {
  console.debug('score updated');
  store.dispatch(
    gameActions.updateIssue({
      issueId,
      updatedIssue: { lastRoundResult: roundResult, score: totalScore },
    })
  );
}

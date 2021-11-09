import { appActions } from '../../../../redux/slices/app/app-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { InfoMessage } from '../../../../redux/types/info-message';
import { IAddIssueResponseWS } from '../../types';

export default function issueCreated({
  addedIssue,
}: IAddIssueResponseWS): void {
  const issues = store.getState().game.issues;
  store.dispatch(gameActions.changeIssues(issues.concat(addedIssue)));
  store.dispatch(
    appActions.addOneInfoMessage(
      new InfoMessage(`Issue "${addedIssue.title}" created`).toObject()
    )
  );
}

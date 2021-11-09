import { appActions } from '../../../../redux/slices/app/app-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { InfoMessage } from '../../../../redux/types/info-message';
import { IUpdateIssueResponseWS } from '../../types';

export default function issueUpdated({
  updatedIssue,
}: IUpdateIssueResponseWS): void {
  store.dispatch(
    gameActions.updateIssue({
      issueId: updatedIssue.id,
      updatedIssue: updatedIssue,
    })
  );
  store.dispatch(
    appActions.addOneInfoMessage(
      new InfoMessage(`Issue ${updatedIssue.title} updated`).toObject()
    )
  );
}

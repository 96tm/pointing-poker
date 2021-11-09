import { appActions } from '../../../../redux/slices/app/app-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { InfoMessage } from '../../../../redux/types/info-message';
import { IDeleteIssueResponseWS } from '../../types';

export default function issueDeleted({
  deletedIssueId,
  title,
}: IDeleteIssueResponseWS): void {
  store.dispatch(gameActions.deleteIssue(deletedIssueId));
  store.dispatch(
    appActions.addOneInfoMessage(
      new InfoMessage(`Issue ${title} deleted`).toObject()
    )
  );
}

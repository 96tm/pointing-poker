import { gameSelectors } from '../../../../redux/selectors';
import { appActions } from '../../../../redux/slices/app/app-slice';
import { gamePageActions } from '../../../../redux/slices/game-page/game-page';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { TGameStatus } from '../../../../redux/types';
import { InfoMessage } from '../../../../redux/types/info-message';
import { IFinishGameResponseWS } from '../../types';

export default function roundFinished({
  roundResult,
  totalScore,
}: IFinishGameResponseWS): void {
  const currentIssue = gameSelectors.selectCurrentIssue(store.getState());
  if (currentIssue) {
    store.dispatch(
      gameActions.updateIssue({
        issueId: currentIssue.id,
        updatedIssue: {
          ...currentIssue,
          lastRoundResult: roundResult,
          score: totalScore,
        },
      })
    );
  }
  store.dispatch(gameActions.changeStatus(TGameStatus.started));
  store.dispatch(gamePageActions.changeTimer({ minutes: 0, seconds: 0 }));
  store.dispatch(
    appActions.addOneInfoMessage(new InfoMessage('Round finished').toObject())
  );
}

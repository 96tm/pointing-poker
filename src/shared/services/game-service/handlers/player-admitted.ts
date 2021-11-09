import { appActions } from '../../../../redux/slices/app/app-slice';
import { currentUserActions } from '../../../../redux/slices/current-user/current-user-slice';
import { gameSettingsActions } from '../../../../redux/slices/game-settings/game-settings-slice';
import { gameActions } from '../../../../redux/slices/game/game-slice';
import { store } from '../../../../redux/store';
import { InfoMessage } from '../../../../redux/types/info-message';
import { IAdmitPlayerResponseWS } from '../../types';

export default function playerAdmitted({
  playerId,
  messages,
  issues,
  players,
  gameStatus,
  currentIssueId,
  gameId,
  gameSettings,
}: IAdmitPlayerResponseWS): void {
  store.dispatch(gameActions.changeId(gameId));
  store.dispatch(gameActions.changeMessages(messages));
  store.dispatch(gameActions.changeIssues(issues));
  store.dispatch(gameActions.changePlayers(players));
  store.dispatch(currentUserActions.changeCurrentUser({ id: playerId }));
  store.dispatch(gameActions.changeCurrentIssueId(currentIssueId));
  store.dispatch(gameSettingsActions.changeSettings(gameSettings));
  store.dispatch(gameActions.changeStatus(gameStatus));

  store.dispatch(
    appActions.addOneInfoMessage(
      new InfoMessage('You have joined the game').toObject()
    )
  );
}

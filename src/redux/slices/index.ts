import { appSlice } from './app/app-slice';
import { currentUserSlice } from './current-user/current-user-slice';
import { entryRequestsSlice } from './entry-requests/entry-requests';
import { gamePageSlice } from './game-page/game-page';
import { gameSettingsSlice } from './game-settings/game-settings-slice';
import { gameSlice } from './game/game-slice';
import { lobbyPageSlice } from './lobby-page/lobby-page';
import { votingKickSlice } from './voting-kick/voting-kick';

export const rootReducer = {
  game: gameSlice.reducer,
  app: appSlice.reducer,
  currentUser: currentUserSlice.reducer,
  gameSettings: gameSettingsSlice.reducer,
  lobbyPage: lobbyPageSlice.reducer,
  gamePage: gamePageSlice.reducer,
  votingKick: votingKickSlice.reducer,
  entryRequests: entryRequestsSlice.reducer,
};

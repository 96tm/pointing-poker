import { Socket } from 'socket.io-client';
import { currentUserActions } from '../../../redux/slices/current-user/current-user-slice';
import { entryRequestsActions } from '../../../redux/slices/entry-requests/entry-requests';
import { gameSettingsActions } from '../../../redux/slices/game-settings/game-settings-slice';
import { gameActions } from '../../../redux/slices/game/game-slice';
import { votingKickActions } from '../../../redux/slices/voting-kick/voting-kick';
import { store } from '../../../redux/store';
import { socketIO } from '../socket';
import currentIssueChanged from './handlers/current-issue-changed';
import entryRequested from './handlers/entry-requested';
import gameCancelled from './handlers/game-cancelled';
import gameFinished from './handlers/game-finished';
import gameStarted from './handlers/game-started';
import handleDisconnect from './handlers/handle-disconnect';
import handleError from './handlers/handle-error';
import issueCreated from './handlers/issue-created';
import issueDeleted from './handlers/issue-deleted';
import issueScoreUpdated from './handlers/issue-score-updated';
import issueUpdated from './handlers/issue-updated';
import messagePosted from './handlers/message-posted';
import playerAdded from './handlers/player-added';
import playerAdmitted from './handlers/player-admitted';
import playerKicked from './handlers/player-kicked';
import playerKickedByVote from './handlers/player-kicked-by-vote';
import playerLeft from './handlers/player-left';
import playerNotKickedByVote from './handlers/player-not-kicked-by-vote';
import playerRejected from './handlers/player-rejected';
import roundFinished from './handlers/round-finished';
import roundStarted from './handlers/round-started';
import votingToKickStarted from './handlers/voting-to-kick-started';

import { SocketResponseEvents } from './socket-response-events';

export class GameService {
  constructor(private io: Socket) {}

  resetState(): void {
    store.dispatch(gameActions.resetGame());
    store.dispatch(currentUserActions.resetCurrentUser());
    store.dispatch(votingKickActions.resetVotingKick());
    store.dispatch(gameSettingsActions.resetSettings());
    store.dispatch(entryRequestsActions.resetEntryRequests());
    this.io.disconnect();
  }

  init(): void {
    this.io.on('error', handleError);
    this.io.on('disconnect', handleDisconnect);
    this.io.on(
      SocketResponseEvents.playerNotKickedByVote,
      playerNotKickedByVote
    );
    this.io.on(SocketResponseEvents.playerAdded, playerAdded);
    this.io.on(SocketResponseEvents.issueUpdated, issueUpdated);
    this.io.on(SocketResponseEvents.issueCreated, issueCreated);
    this.io.on(SocketResponseEvents.issueDeleted, issueDeleted);
    this.io.on(SocketResponseEvents.gameCancelled, gameCancelled);
    this.io.on(SocketResponseEvents.gameStarted, gameStarted);
    this.io.on(SocketResponseEvents.gameFinished, gameFinished);
    this.io.on(SocketResponseEvents.playerLeft, playerLeft);
    this.io.on(SocketResponseEvents.playerKicked, playerKicked);
    this.io.on(SocketResponseEvents.playerKickedByVote, playerKickedByVote);
    this.io.on(SocketResponseEvents.votingToKickStarted, votingToKickStarted);
    this.io.on(SocketResponseEvents.messagePosted, messagePosted);
    this.io.on(SocketResponseEvents.currentIssueChanged, currentIssueChanged);
    this.io.on(SocketResponseEvents.roundStarted, roundStarted);
    this.io.on(SocketResponseEvents.roundFinished, roundFinished);
    this.io.on(SocketResponseEvents.entryRequested, entryRequested);
    this.io.on(SocketResponseEvents.playerAdmitted, playerAdmitted);
    this.io.on(SocketResponseEvents.playerRejected, playerRejected);
    this.io.on(SocketResponseEvents.issueScoreUpdated, issueScoreUpdated);
  }
}

export const gameService = new GameService(socketIO);

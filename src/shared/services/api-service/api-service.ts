import { IClientCheckGameParameters } from '../../../redux/types';
import { IResponse } from '../types';
import * as handlers from './handlers';

export class ApiService {
  static connect = handlers.handleAPIError<void, IResponse>(
    handlers.apiConnect
  );
  static admitPlayer = handlers.apiAdmitPlayer;
  static rejectPlayer = handlers.apiRejectPlayer;
  static createGame = handlers.apiCreateGame;
  static addPlayer = handlers.apiAddPlayer;
  static checkGame = handlers.handleAPIError<
    IClientCheckGameParameters,
    IResponse
  >(handlers.apiCheckGame);
  static postMessage = handlers.apiPostMessage;
  static leaveGame = handlers.apiLeaveGame;
  static startRound = handlers.apiStartRound;
  static finishRound = handlers.apiFinishRound;
  static kickPlayer = handlers.apiKickPlayer;
  static startVotingToKick = handlers.apiStartVotingToKick;
  static voteToKick = handlers.apiVoteToKick;
  static getNextIssue = handlers.apiGetNextIssue;
  static createIssue = handlers.apiCreateIssue;
  static updateIssue = handlers.apiUpdateIssue;
  static deleteIssue = handlers.apiDeleteIssue;
  static startGame = handlers.apiStartGame;
  static cancelGame = handlers.apiCancelGame;
  static scoreIssue = handlers.apiScoreIssue;
  static finishGame = handlers.apiFinishGame;
  static changeCurrentIssue = handlers.apiChangeCurrentIssue;
}

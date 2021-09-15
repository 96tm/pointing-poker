import { IUser } from './user';
import { IMessage } from './message';
import { IIssue } from './issue';
import { IGameSettings } from './game-settings';
import { TCardScore } from './card';
import { TGameStatus } from '.';

interface IRequestParameters {
  gameId: string;
}

export interface IRequestResult {
  message?: string;
  errorCode?: number;
  error?: boolean;
}

export interface IClientAddPlayerResult extends IRequestResult {
  dealer: IUser;
  playerId: string;
  gameStatus: TGameStatus;
}

export interface ICreateGameRequestResult extends IRequestResult {
  dealer: IUser;
  gameId: string;
}

export interface IClientPostMessageResult {
  postedMessage: IMessage;
}

export interface IClientCreateIssueResult {
  createdIssue: IIssue;
}

export interface IClientAddPlayerParameters {
  addedPlayer: IUser;
  gameId: string;
}

export interface IClientCreateGameParameters {
  dealerInfo: IUser;
}

export interface IClientPostMessageParameters extends IRequestParameters {
  playerId: string;
  message: IMessage;
}

export interface IClientCreateIssueParameters extends IRequestParameters {
  dealerId: string;
  addedIssue: IIssue;
}

export interface IClientUpdateIssueParameters extends IRequestParameters {
  dealerId: string;
  updatedIssue: IIssue;
}

export interface IClientDeleteIssueParameters extends IRequestParameters {
  dealerId: string;
  deletedIssueId: string;
}

export interface IClientStartGameParameters extends IRequestParameters {
  settings: IGameSettings;
  dealerId: string;
}

export interface IClientCancelGameParameters extends IRequestParameters {
  dealerId: string;
}

export interface IClientScoreIssueParameters extends IRequestParameters {
  playerId: string;
  issueId: string;
  score: TCardScore;
}

export interface IClientFinishGameParameters extends IRequestParameters {
  dealerId: string;
}

export interface IClientCancelGameParameters extends IRequestParameters {
  dealerId: string;
}

export interface IClientStartVotingToKickParameters extends IRequestParameters {
  votingPlayerId: string;
  kickedPlayerId: string;
}

export interface IClientVoteToKickParameters extends IRequestParameters {
  votingPlayerId: string;
  kickedPlayerId: string;
  accept: boolean;
}

export interface IClientChangeCurrentIssueParameters
  extends IRequestParameters {
  dealerId: string;
  issueId: string;
}

export interface IClientKickPlayerParameters extends IRequestParameters {
  dealerId: string;
  kickedPlayerId: string;
}

export interface IClientKickPlayerVoteParameters extends IRequestParameters {
  votingPlayerId: string;
  kickedPlayerId: string;
}

export interface IClientCheckGameParameters {
  gameId: string;
}

export interface IClientStartRoundParameters extends IRequestParameters {
  dealerId: string;
  issueId: string;
}

export interface IClientLeaveGameParameters extends IRequestParameters {
  playerId: string;
}

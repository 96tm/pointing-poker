import {
  IGameSettings,
  IIssue,
  IMessage,
  IUser,
  TCardScore,
  TGameStatus,
  TRoundResult,
  TUserRole,
} from '../../redux/types';
import { TStatusCode } from '../constants';

export interface IResponse {
  statusCode: TStatusCode;
  message?: string;
  errorCode?: number;
}

export interface IConnectResponse extends IResponse {
  connectionStatus: boolean;
  socketId: string;
}

export interface ICheckGameResponse extends IResponse {
  gameExists: boolean;
}

export interface ICreateGameResponse extends IResponse {
  dealerId: string;
  gameId: string;
}

export interface IAddPlayerResponse extends IResponse {
  dealer: IUser;
  playerId: string;
  messages: IMessage[];
  issues: IIssue[];
  players: IUser[];
  gameStatus: TGameStatus;
  currentIssueId: string;
}

export interface IAddPlayerResponseWS {
  addedPlayer: IUser;
}

export interface IFinishGameResponseWS {
  roundResult: TRoundResult;
  totalScore: number;
}

export interface IEntryRequestResponseWS {
  playerId: string;
  firstName: string;
  lastName: string;
  role: TUserRole;
  jobPosition: string;
}

export interface IIssueScoreUpdatedResponseWS {
  issueId: string;
  roundResult: TRoundResult;
  totalScore: number;
}

export interface IAdmitPlayerResponseWS {
  playerId: string;
  messages: IMessage[];
  issues: IIssue[];
  players: IUser[];
  gameStatus: TGameStatus;
  currentIssueId: string;
  gameId: string;
  gameSettings: IGameSettings;
}

export interface IRejectPlayerResponseWS {
  gameId: string;
}

export interface IUpdateIssueResponseWS {
  updatedIssue: IIssue;
}

export interface IAddIssueResponseWS {
  addedIssue: IIssue;
}

export interface IStartGameResponseWS {
  settings: IGameSettings;
}

export interface ILeaveGameResponseWS {
  playerId: string;
  firstName: string;
  lastName?: string;
}

export interface IKickPlayerResponseWS {
  kickedPlayerId: string;
  firstName: string;
  lastName: string;
}

export interface IStartVotingToKickResponseWS {
  kickedPlayerId: string;
  votingPlayerId: string;
}

export interface IVoteToKickResponseWS {
  kickedPlayerId: string;
  firstName: string;
  lastName?: string;
  acceptNumber: number;
  numberOfPlayers: number;
}

export interface IDeleteIssueResponseWS {
  deletedIssueId: string;
  title: string;
}

export interface IPostMessageResponseWS {
  userId: string;
  messageId: string;
  message: string;
}

export interface IChangeCurrentIssueResponseWS {
  issueId: string;
}

export interface IScoreIssueResponseWS {
  issueId: string;
  userId: string;
  score: TCardScore;
}

export interface IPostMessageResponse extends IResponse {
  gameId: string;
  messageId: string;
}

export interface IStartRoundResponse extends IResponse {
  gameId: string;
  issueId: string;
}

export interface IScoreIssueResponse extends IResponse {
  gameId: string;
  issueId: string;
}

export interface IFinishGameResponse extends IResponse {
  gameId: string;
}

export interface IChangeCurrentIssueResponse extends IResponse {
  gameId: string;
  issueId: string;
}

export interface ICreateIssueResponse extends IResponse {
  gameId: string;
  issueId: string;
}

export interface IGetNextIssueResponse extends IResponse {
  issueId: string;
}

export interface IUpdateIssueResponse extends IResponse {
  gameId: string;
  issueId: string;
}

export interface ILeaveGameResponse extends IResponse {
  gameId: string;
}

export interface IStartGameResponse extends IResponse {
  gameId: string;
}

export interface ICancelGameResponse extends IResponse {
  gameId: string;
}

export interface IKickPlayerResponse extends IResponse {
  gameId: string;
  kickedPlayerId: string;
}

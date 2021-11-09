import { IUser } from './user';
import { IIssue } from './issue';
import { IMessage } from './message';

export enum TGameStatus {
  lobby = 'lobby',
  started = 'started',
  roundInProgress = 'roundInProgress',
  inactive = 'inactive',
}

export interface IGame {
  id: string;
  currentIssueId: string;
  status: TGameStatus;
  players: IUser[];
  issues: IIssue[];
  messages: IMessage[];
}

export class Game implements IGame {
  id = '';
  currentIssueId = '';
  status = TGameStatus.inactive;
  players: IUser[] = [];
  issues: IIssue[] = [];
  messages: IMessage[] = [];

  constructor(gameParameters?: Partial<IGame>) {
    Object.assign(this, gameParameters);
  }

  toObject(): IGame {
    return {
      id: this.id,
      currentIssueId: this.currentIssueId,
      status: this.status,
      players: this.players,
      issues: this.issues,
      messages: this.messages,
    };
  }
}

export interface ICreateGameParameters {
  gameId: string;
  dealer: IUser;
}

import { IInfoMessage } from './info-message';

export interface IApp {
  socketId: string;
  isConnected: boolean;
  infoMessages: IInfoMessage[];
  isLoading: boolean;
}

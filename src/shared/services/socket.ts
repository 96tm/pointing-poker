import { io } from 'socket.io-client';
import { APP_CONSTANTS } from '../constants';

export const socketIO = io(APP_CONSTANTS.SERVER_URL);

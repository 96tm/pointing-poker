import { APP_CONSTANTS } from '../../../constants';
import { socketIO } from '../../socket';
import { IResponse } from '../../types';

export async function apiConnect(): Promise<IResponse> {
  const json = await (
    await fetch(`${APP_CONSTANTS.SERVER_URL}/connect`)
  ).json();
  socketIO.connect();
  return { ...json, socketId: socketIO.id };
}

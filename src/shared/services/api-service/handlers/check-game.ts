import { IClientCheckGameParameters } from '../../../../redux/types';
import { APP_CONSTANTS } from '../../../constants';
import { IResponse } from '../../types';

export async function apiCheckGame({
  gameId,
}: IClientCheckGameParameters): Promise<IResponse> {
  const json = await fetch(`${APP_CONSTANTS.SERVER_URL}/check-game`, {
    method: 'POST',
    body: JSON.stringify({ gameId }),
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => response.json());
  return json;
}

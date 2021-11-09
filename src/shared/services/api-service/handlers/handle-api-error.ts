import { TStatusCode } from '../../../constants';
import { IResponse } from '../../types';

export function handleAPIError<T, K>(
  apiFunction: (input: T) => Promise<K>
): (input: T) => Promise<K | IResponse> {
  async function inner(input: T): Promise<K | IResponse> {
    try {
      const response = await apiFunction(input);
      return response;
    } catch (error) {
      return {
        statusCode: TStatusCode.INTERNAL_SERVER_ERROR,
        message: (error as Error).message,
      };
    }
  }
  return inner;
}

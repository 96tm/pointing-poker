import { socketIO } from '../socket';

export async function asyncEmit<T, K>(event: string, data: T): Promise<K> {
  return new Promise((resolve) =>
    socketIO.emit(event, data, (response: K) => {
      return resolve(response);
    })
  );
}

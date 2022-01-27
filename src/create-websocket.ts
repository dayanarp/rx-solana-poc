import { fromEvent, mapTo, Observable, share } from 'rxjs';
import { WebSocket } from 'ws';
import { RPC_WEBSOCKET } from './constants';

export const createWebSocket = (): Observable<WebSocket> => {
  const ws = new WebSocket(RPC_WEBSOCKET);

  return fromEvent(ws, 'open').pipe(
    share({
      resetOnRefCountZero: false,
    }),
    mapTo(ws)
  );
};

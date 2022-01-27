import { filter, fromEvent, map } from 'rxjs';
import { WebSocket } from 'ws';

export const onAccountChange = (ws: WebSocket) =>
  fromEvent(ws, 'message').pipe(
    map(({ data }) => JSON.parse(data)),
    filter((message) => message.method === 'accountNotification')
  );

import { filter, fromEvent, map } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { WebSocket } from 'ws';

export const accountSubscribe = (ws: WebSocket, accountId: string) => {
  const subscriptionId = uuid();

  ws.send(
    JSON.stringify([
      {
        jsonrpc: '2.0',
        id: subscriptionId,
        method: 'accountSubscribe',
        params: [
          accountId,
          {
            encoding: 'base64',
            commitment: 'finalized',
          },
        ],
      },
    ])
  );

  return fromEvent(ws, 'message').pipe(
    filter(({ data }) => {
      const parsedData = JSON.parse(data);

      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        return false;
      }

      return parsedData[0].id === subscriptionId;
    }),
    map(({ data }) => JSON.parse(data)[0].result)
  );
};

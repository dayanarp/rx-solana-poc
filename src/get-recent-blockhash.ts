import { concatMap, defer, from, map } from 'rxjs';
import { RPC_ENDPOINT } from './constants';
import { fromFetch } from './from-fetch';

export const getRecentBlockhash = () => {
  return fromFetch(RPC_ENDPOINT, {
    body: JSON.stringify([
      {
        jsonrpc: '2.0',
        method: 'getRecentBlockhash',
        id: 1,
        params: [],
      },
    ]),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  }).pipe(
    concatMap((res) =>
      defer(() => from(res.json()).pipe(map(([res]) => res.result.value)))
    )
  );
};

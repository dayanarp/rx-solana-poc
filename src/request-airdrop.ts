import { RPC_ENDPOINT } from './constants';
import { fromFetch } from './from-fetch';

export const requestAirdrop = (publicKey: string, lamports: number) =>
  fromFetch(RPC_ENDPOINT, {
    body: JSON.stringify([
      {
        jsonrpc: '2.0',
        method: 'requestAirdrop',
        id: 1,
        params: [publicKey, lamports],
      },
    ]),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  });

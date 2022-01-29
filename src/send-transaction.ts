import { RPC_ENDPOINT } from './constants';
import { fromFetch } from './from-fetch';

export type Commitment =
  | 'processed'
  | 'confirmed'
  | 'finalized'
  | 'recent' // Deprecated as of v1.5.5
  | 'single' // Deprecated as of v1.5.5
  | 'singleGossip' // Deprecated as of v1.5.5
  | 'root' // Deprecated as of v1.5.5
  | 'max'; // Deprecated as of v1.5.5

export type SendOptions = {
  /** disable transaction verification step */
  skipPreflight?: boolean;
  /** preflight commitment level */
  preflightCommitment?: Commitment;
};

export const toBuffer = (arr: Buffer | Uint8Array | Array<number>): Buffer => {
  if (Buffer.isBuffer(arr)) {
    return arr;
  } else if (arr instanceof Uint8Array) {
    return Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
  } else {
    return Buffer.from(arr);
  }
};

export const sendTransaction = (
  transaction: Buffer | Uint8Array | Array<number>,
  options?: SendOptions
) => {
  const config: any = { encoding: 'base64' };
  const skipPreflight = options && options.skipPreflight;
  const preflightCommitment = options && options.preflightCommitment;

  if (skipPreflight) {
    config.skipPreflight = skipPreflight;
  }
  if (preflightCommitment) {
    config.preflightCommitment = preflightCommitment;
  }

  return fromFetch(RPC_ENDPOINT, {
    body: JSON.stringify([
      {
        jsonrpc: '2.0',
        method: 'sendTransaction',
        id: 1,
        params: [toBuffer(transaction).toString('base64'), config],
      },
    ]),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  });
};

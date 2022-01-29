import { Keypair } from '@solana/web3.js';
import { concatMap } from 'rxjs';
import { accountSubscribe } from './account-subscribe';
import { createNativeTransferTransaction } from './create-native-transfer-transaction';
import { createWebSocket } from './create-websocket';
import mySecretKey from './id.json';
import { onAccountChange } from './on-account-change';
import { sendTransaction } from './send-transaction';

const myKeypair = Keypair.fromSecretKey(Uint8Array.from(mySecretKey));

const webSocket$ = createWebSocket();

webSocket$
  .pipe(concatMap((ws) => onAccountChange(ws)))
  .subscribe((accountNotification) =>
    console.log('accountNotification: ', accountNotification)
  );

webSocket$
  .pipe(concatMap((ws) => accountSubscribe(ws, myKeypair.publicKey.toBase58())))
  .subscribe();

createNativeTransferTransaction(myKeypair, Keypair.generate().publicKey, 1)
  .pipe(concatMap((transaction) => sendTransaction(transaction.serialize())))
  .subscribe();

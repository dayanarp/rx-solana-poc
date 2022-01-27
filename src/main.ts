import { concatMap } from 'rxjs';
import { accountSubscribe } from './account-subscribe';
import { AIRDROP_LAMPORTS, WALLET_PUBLIC_KEY } from './constants';
import { createWebSocket } from './create-websocket';
import { onAccountChange } from './on-account-change';
import { requestAirdrop } from './request-airdrop';

const webSocket$ = createWebSocket();

webSocket$
  .pipe(concatMap((ws) => onAccountChange(ws)))
  .subscribe((accountNotification) =>
    console.log('accountNotification: ', accountNotification)
  );

webSocket$
  .pipe(concatMap((ws) => accountSubscribe(ws, WALLET_PUBLIC_KEY)))
  .subscribe();

requestAirdrop(WALLET_PUBLIC_KEY, AIRDROP_LAMPORTS).subscribe();

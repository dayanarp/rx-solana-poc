import {
  PublicKey,
  Signer,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { map, Observable } from 'rxjs';
import { getRecentBlockhash } from './get-recent-blockhash';

export const createTransaction = (feePayer: PublicKey) =>
  getRecentBlockhash().pipe(
    map(
      ({ blockhash }) =>
        new Transaction({
          feePayer,
          recentBlockhash: blockhash,
        })
    )
  );

export const addInstructionToTransaction =
  (instruction: TransactionInstruction) => (source: Observable<Transaction>) =>
    source.pipe(map((transaction) => transaction.add(instruction)));

export const signTransaction =
  (signer: Signer) => (source: Observable<Transaction>) =>
    source.pipe(
      map((transaction) => {
        transaction.sign(signer);

        return transaction;
      })
    );

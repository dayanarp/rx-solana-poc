import { PublicKey, Signer, SystemProgram } from '@solana/web3.js';
import {
  addInstructionToTransaction,
  createTransaction,
  signTransaction,
} from './transaction-utils';

export const createNativeTransferTransaction = (
  fromSigner: Signer,
  toPubkey: PublicKey,
  lamports: number
) =>
  createTransaction(fromSigner.publicKey).pipe(
    addInstructionToTransaction(
      SystemProgram.transfer({
        fromPubkey: fromSigner.publicKey,
        toPubkey,
        lamports,
      })
    ),
    signTransaction(fromSigner)
  );

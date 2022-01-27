import fetch, { RequestInit, RequestInfo } from 'node-fetch';
import { defer, from } from 'rxjs';

export const fromFetch = (url: RequestInfo, init?: RequestInit) =>
  defer(() => from(fetch(url, init)));

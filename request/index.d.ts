import Store from "../store";

// ember-data-types/q/identifier.ts

export interface Identifier {
  lid: string;
  clientId?: string;
}

export interface ExistingRecordIdentifier extends Identifier {
  id: string;
  type: string;
}

export interface NewRecordIdentifier extends Identifier {
  id: string | null;
  type: string;
}
export type RecordIdentifier = ExistingRecordIdentifier | NewRecordIdentifier;

export interface StableIdentifier extends Identifier {
}

export interface StableExistingRecordIdentifier extends StableIdentifier {
  id: string;
  type: string;
}

export interface StableNewRecordIdentifier extends StableIdentifier {
  id: string | null;
  type: string;
}

export type StableRecordIdentifier = StableExistingRecordIdentifier | StableNewRecordIdentifier;

// packages/s

interface Request {
  controller?: AbortController;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  destination?: RequestDestination;
  headers?: Headers;
  integrity?: string;
  keepalive?: boolean;
  method?: string;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal;
  url?: string;
}
export type ImmutableHeaders = Headers & { clone(): Headers; toJSON(): [string, string][] };
export interface GodContext {
  controller: AbortController;
  response: ResponseInfo | null;
  stream: ReadableStream | Promise<ReadableStream | null> | null;
  id: number;
}

export interface StructuredDataDocument<T> {
  request: ImmutableRequestInfo;
  response: Response | ResponseInfo | null;
  content: T;
}

export interface StructuredErrorDocument<T = unknown> extends Error {
  request: ImmutableRequestInfo;
  response: Response | ResponseInfo | null;
  error: string | object;
  content?: T;
}

export type Deferred<T> = {
  resolve(v: T): void;
  reject(v: unknown): void;
  promise: Promise<T>;
};

export type Future<T> = Promise<StructuredDataDocument<T>> & {
  abort(reason?: string): void;
  getStream(): Promise<ReadableStream | null>;
  onFinalize(cb: () => void): void;
};

export type DeferredFuture<T> = {
  resolve(v: StructuredDataDocument<T>): void;
  reject(v: unknown): void;
  promise: Future<T>;
};

export interface RequestInfo extends Request {
  cacheOptions?: { key?: string; reload?: boolean; backgroundReload?: boolean };
  store?: Store;

  op?: string;
  records?: StableRecordIdentifier[];

  disableTestWaiter?: boolean;

  data?: Record<string, unknown>;

  options?: Record<string, unknown>;
}

export interface ImmutableRequestInfo {
  readonly cacheOptions?: {
    key?: string;
    reload?: boolean;
    backgroundReload?: boolean;
  };
  readonly store?: Store;
  readonly op?: string;
  readonly records?: StableRecordIdentifier[];
  readonly disableTestWaiter?: boolean;
  readonly cache?: RequestCache;
  readonly credentials?: RequestCredentials;
  readonly destination?: RequestDestination;
  readonly headers?: Headers & { clone(): Headers };
  readonly integrity?: string;
  readonly keepalive?: boolean;
  readonly method?: string;
  readonly mode?: RequestMode;
  readonly redirect?: RequestRedirect;
  readonly referrer?: string;
  readonly referrerPolicy?: ReferrerPolicy;
  readonly signal?: AbortSignal;
  readonly url?: string;
  readonly data?: Record<string, unknown>;
  readonly options?: Record<string, unknown>;
}

export interface ResponseInfo {
  readonly headers: ImmutableHeaders;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: string;
  readonly url: string;
}

export interface RequestContext {
  request: ImmutableRequestInfo;
  id: number;

  setStream(stream: ReadableStream): void;
  setResponse(response: Response | ResponseInfo): void;
}

export type NextFn<P = unknown> = (req: RequestInfo) => Future<P>;

export interface Handler {
  request<T = unknown>(context: RequestContext, next: NextFn<T>): Promise<T> | Future<T>;
}

export interface RequestResponse<T> {
  result: T;
}

export type GenericCreateArgs = Record<string | symbol, unknown>;

// packages/request/src/-private/manager.ts

export class RequestManager {
  constructor(options?: GenericCreateArgs);
  useCache(cacheHandler: Handler): void;
  use(newHandlers: Handler[]): void;
  request<T = unknown>(request: RequestInfo): Future<T>;

  static create(options?: GenericCreateArgs): RequestManager;
}

// packages/request/src/-private/future.ts

declare function createDeferred<T>(): Deferred<T>;

// packages/request/src/index.ts

export default RequestManager;
export { createDeferred };

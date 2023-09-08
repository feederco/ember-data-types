import ModelRegistry from "../types/registries/model";
import { ModelSchema } from "../model";
import Adapter, { BuildURLMixin } from "./index";
import Store from "../store";

/**
     * The REST adapter allows your store to communicate with an HTTP server by
     * transmitting JSON via XHR. Most Ember.js apps that consume a JSON API
     * should use the REST adapter.
     */
declare class RESTAdapter extends Adapter implements BuildURLMixin {
  /**
   * Takes a URL, an HTTP method and a hash of data, and makes an HTTP request.
   */
  ajax(url: string, type: string, options?: object): Promise<any>;
  /**
   * Generate ajax options
   */
  ajaxOptions(url: string, type: string, options?: object): object;
  /**
   * By default, the RESTAdapter will send the query params sorted alphabetically to the
   * server.
   */
  sortQueryParams(obj: {}): {};
  /**
   * Called by the store in order to fetch the JSON for a given
   * type and ID.
   */
  findRecord<K extends keyof ModelRegistry>(
      store: Store,
      type: ModelSchema<K>,
      id: string,
      snapshot: Snapshot<K>,
  ): Promise<any>;
  /**
   * Called by the store in order to fetch a JSON array for all
   * of the records for a given type.
   */
  findAll<K extends keyof ModelRegistry>(
      store: Store,
      type: ModelSchema<K>,
      sinceToken: string,
      snapshotRecordArray: SnapshotRecordArray<K>,
  ): Promise<any>;
  /**
   * Called by the store in order to fetch a JSON array for
   * the records that match a particular query.
   */
  query<K extends keyof ModelRegistry>(store: Store, type: ModelSchema<K>, query: {}): Promise<any>;
  /**
   * Called by the store in order to fetch a JSON object for
   * the record that matches a particular query.
   */
  queryRecord<K extends keyof ModelRegistry>(store: Store, type: ModelSchema<K>, query: {}): Promise<any>;
  /**
   * Called by the store in order to fetch several records together if `coalesceFindRequests` is true
   */
  findMany<K extends keyof ModelRegistry>(
      store: Store,
      type: ModelSchema<K>,
      ids: any[],
      snapshots: any[],
  ): Promise<any>;
  /**
   * Called by the store in order to fetch a JSON array for
   * the unloaded records in a has-many relationship that were originally
   * specified as a URL (inside of `links`).
   */
  findHasMany<K extends keyof ModelRegistry>(
      store: Store,
      snapshot: Snapshot<K>,
      url: string,
      relationship: {},
  ): Promise<any>;
  /**
   * Called by the store in order to fetch the JSON for the unloaded record in a
   * belongs-to relationship that was originally specified as a URL (inside of
   * `links`).
   */
  findBelongsTo<K extends keyof ModelRegistry>(
      store: Store,
      snapshot: Snapshot<K>,
      url: string,
  ): Promise<any>;
  /**
   * Called by the store when a newly created record is
   * saved via the `save` method on a model record instance.
   */
  createRecord<K extends keyof ModelRegistry>(
      store: Store,
      type: ModelSchema<K>,
      snapshot: Snapshot<K>,
  ): Promise<any>;
  /**
   * Called by the store when an existing record is saved
   * via the `save` method on a model record instance.
   */
  updateRecord<K extends keyof ModelRegistry>(
      store: Store,
      type: ModelSchema<K>,
      snapshot: Snapshot<K>,
  ): Promise<any>;
  /**
   * Called by the store when a record is deleted.
   */
  deleteRecord<K extends keyof ModelRegistry>(
      store: Store,
      type: ModelSchema<K>,
      snapshot: Snapshot<K>,
  ): Promise<any>;
  /**
   * Organize records into groups, each of which is to be passed to separate
   * calls to `findMany`.
   */
  groupRecordsForFindMany(store: Store, snapshots: any[]): any[];
  /**
   * Takes an ajax response, and returns the json payload or an error.
   */
  handleResponse(status: number, headers: {}, payload: {}, requestData: {}): {};
  /**
   * Default `handleResponse` implementation uses this hook to decide if the
   * response is a success.
   */
  isSuccess(status: number, headers: {}, payload: {}): boolean;
  /**
   * Default `handleResponse` implementation uses this hook to decide if the
   * response is an invalid error.
   */
  isInvalid(status: number, headers: {}, payload: {}): boolean;
  /**
   * Get the data (body or query params) for a request.
   */
  dataForRequest(params: {}): {};
  /**
   * Get the HTTP method for a request.
   */
  methodForRequest(params: {}): string;
  /**
   * Get the URL for a request.
   */
  urlForRequest(params: {}): string;
  /**
   * Get the headers for a request.
   */
  headersForRequest(params: {}): {};
  /**
   * Builds a URL for a given type and optional ID.
   */
  buildURL<K extends keyof ModelRegistry>(
      modelName?: K,
      id?: string | any[] | {} | null,
      snapshot?: Snapshot<K> | any[] | null,
      requestType?: string,
      query?: {},
  ): string;
  /**
   * Used by `findAll` and `findRecord` to build the query's `data` hash supplied to the ajax method.
   */
  buildQuery<K extends keyof ModelRegistry>(snapshot: Snapshot<K>): Record<string, unknown>;
  /**
   * Builds a URL for a `store.findRecord(type, id)` call.
   */
  urlForFindRecord<K extends keyof ModelRegistry>(id: string, modelName: K, snapshot: Snapshot<K>): string;
  /**
   * Builds a URL for a `store.findAll(type)` call.
   */
  urlForFindAll<K extends keyof ModelRegistry>(modelName: K, snapshot: SnapshotRecordArray<K>): string;
  /**
   * Builds a URL for a `store.query(type, query)` call.
   */
  urlForQuery<K extends keyof ModelRegistry>(query: {}, modelName: K): string;
  /**
   * Builds a URL for a `store.queryRecord(type, query)` call.
   */
  urlForQueryRecord<K extends keyof ModelRegistry>(query: {}, modelName: K): string;
  /**
   * Builds a URL for coalesceing multiple `store.findRecord(type, id)`
   * records into 1 request when the adapter's `coalesceFindRequests`
   * property is true.
   */
  urlForFindMany<K extends keyof ModelRegistry>(ids: any[], modelName: K, snapshots: any[]): string;
  /**
   * Builds a URL for fetching a async hasMany relationship when a url
   * is not provided by the server.
   */
  urlForFindHasMany<K extends keyof ModelRegistry>(id: string, modelName: K, snapshot: Snapshot<K>): string;
  /**
   * Builds a URL for fetching a async belongsTo relationship when a url
   * is not provided by the server.
   */
  urlForFindBelongsTo<K extends keyof ModelRegistry>(id: string, modelName: K, snapshot: Snapshot<K>): string;
  /**
   * Builds a URL for a `record.save()` call when the record was created
   * locally using `store.createRecord()`.
   */
  urlForCreateRecord<K extends keyof ModelRegistry>(modelName: K, snapshot: Snapshot<K>): string;
  /**
   * Builds a URL for a `record.save()` call when the record has been update locally.
   */
  urlForUpdateRecord<K extends keyof ModelRegistry>(id: string, modelName: K, snapshot: Snapshot<K>): string;
  /**
   * Builds a URL for a `record.save()` call when the record has been deleted locally.
   */
  urlForDeleteRecord<K extends keyof ModelRegistry>(id: string, modelName: K, snapshot: Snapshot<K>): string;
  /**
   * Determines the pathname for a given type.
   */
  pathForType<K extends keyof ModelRegistry>(modelName: K): string;
}

// Instead of declaring `namespace`, `host`, and `headers` as a property we now declare it in an
// interface. This works around the issue noted here with TypeScript 4:
// https://github.com/microsoft/TypeScript/issues/40220
declare interface RESTAdapter {
  /**
   * Endpoint paths can be prefixed with a `namespace` by setting the namespace
   * property on the adapter:
   */
  namespace: string;
  /**
   * An adapter can target other hosts by setting the `host` property.
   */
  host: string;
  /**
   * Some APIs require HTTP headers, e.g. to provide an API
   * key. Arbitrary headers can be set as key/value pairs on the
   * `RESTAdapter`'s `headers` object and Ember Data will send them
   * along with each ajax request. For dynamic headers see [headers
   * customization](/api/data/classes/DS.RESTAdapter.html#toc_headers-customization).
   */
  headers: {};
}

export default RESTAdapter;

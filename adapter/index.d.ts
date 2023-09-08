import ModelRegistry from "../types/registries/model";
import { ModelSchema } from "../model";
import Store from "../store";

export { default as AdapterRegistry } from 'ember-data/types/registries/adapter';

/**
 * WARNING: This interface is likely to change in order to accomodate https://github.com/emberjs/rfcs/pull/4
 * ## Using BuildURLMixin
 * To use url building, include the mixin when extending an adapter, and call `buildURL` where needed.
 * The default behaviour is designed for RESTAdapter.
 * ### Example
 * ```javascript
 * export default DS.Adapter.extend(BuildURLMixin, {
 * findRecord: function(store, type, id, snapshot) {
 * var url = this.buildURL(type.modelName, id, snapshot, 'findRecord');
 * return this.ajax(url, 'GET');
 * }
 * });
 * ```
 * ### Attributes
 * The `host` and `namespace` attributes will be used if defined, and are optional.
 */
declare class BuildURLMixin {
  /**
   * Builds a URL for a given type and optional ID.
   */
  buildURL<K extends keyof ModelRegistry>(
    modelName?: K,
    id?: string | any[] | {} | null,
    snapshot?: Snapshot<K> | any[] | null,
    requestType?: string,
    query?: {}
  ): string;
  /**
   * Used by `findAll` and `findRecord` to build the query's `data` hash supplied to the ajax method.
   */
  buildQuery<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>
  ): Record<string, unknown>;
  /**
   * Builds a URL for a `store.findRecord(type, id)` call.
   */
  urlForFindRecord<K extends keyof ModelRegistry>(
    id: string,
    modelName: K,
    snapshot: Snapshot<K>
  ): string;
  /**
   * Builds a URL for a `store.findAll(type)` call.
   */
  urlForFindAll<K extends keyof ModelRegistry>(
    modelName: K,
    snapshot: SnapshotRecordArray<K>
  ): string;
  /**
   * Builds a URL for a `store.query(type, query)` call.
   */
  urlForQuery<K extends keyof ModelRegistry>(query: {}, modelName: K): string;
  /**
   * Builds a URL for a `store.queryRecord(type, query)` call.
   */
  urlForQueryRecord<K extends keyof ModelRegistry>(
    query: {},
    modelName: K
  ): string;
  /**
   * Builds a URL for coalesceing multiple `store.findRecord(type, id)`
   * records into 1 request when the adapter's `coalesceFindRequests`
   * property is true.
   */
  urlForFindMany<K extends keyof ModelRegistry>(
    ids: any[],
    modelName: K,
    snapshots: any[]
  ): string;
  /**
   * Builds a URL for fetching a async hasMany relationship when a url
   * is not provided by the server.
   */
  urlForFindHasMany<K extends keyof ModelRegistry>(
    id: string,
    modelName: K,
    snapshot: Snapshot<K>
  ): string;
  /**
   * Builds a URL for fetching a async belongsTo relationship when a url
   * is not provided by the server.
   */
  urlForFindBelongsTo<K extends keyof ModelRegistry>(
    id: string,
    modelName: K,
    snapshot: Snapshot<K>
  ): string;
  /**
   * Builds a URL for a `record.save()` call when the record was created
   * locally using `store.createRecord()`.
   */
  urlForCreateRecord<K extends keyof ModelRegistry>(
    modelName: K,
    snapshot: Snapshot<K>
  ): string;
  /**
   * Builds a URL for a `record.save()` call when the record has been update locally.
   */
  urlForUpdateRecord<K extends keyof ModelRegistry>(
    id: string,
    modelName: K,
    snapshot: Snapshot<K>
  ): string;
  /**
   * Builds a URL for a `record.save()` call when the record has been deleted locally.
   */
  urlForDeleteRecord<K extends keyof ModelRegistry>(
    id: string,
    modelName: K,
    snapshot: Snapshot<K>
  ): string;
  /**
   * Determines the pathname for a given type.
   */
  pathForType<K extends keyof ModelRegistry>(modelName: K): string;
}

/**
 * An adapter is an object that receives requests from a store and
 * translates them into the appropriate action to take against your
 * persistence layer. The persistence layer is usually an HTTP API, but
 * may be anything, such as the browser's local storage. Typically the
 * adapter is not invoked directly instead its functionality is accessed
 * through the `store`.
 */
declare class Adapter extends Ember.Object {
  /**
   * If you would like your adapter to use a custom serializer you can
   * set the `defaultSerializer` property to be the name of the custom
   * serializer.
   */
  defaultSerializer: string;
  /**
   * The `findRecord()` method is invoked when the store is asked for a record that
   * has not previously been loaded. In response to `findRecord()` being called, you
   * should query your persistence layer for a record with the given ID. The `findRecord`
   * method should return a promise that will resolve to a JavaScript object that will be
   * normalized by the serializer.
   */
  findRecord<K extends keyof ModelRegistry>(
    store: Store,
    type: ModelSchema<K>,
    id: string,
    snapshot: Snapshot<K>
  ): Promise<any>;
  /**
   * The `findAll()` method is used to retrieve all records for a given type.
   */
  findAll<K extends keyof ModelRegistry>(
    store: Store,
    type: ModelSchema<K>,
    sinceToken: string,
    snapshotRecordArray: SnapshotRecordArray<K>
  ): Promise<any>;
  /**
   * This method is called when you call `query` on the store.
   */
  query<K extends keyof ModelRegistry>(
    store: Store,
    type: ModelSchema<K>,
    query: {},
    recordArray: AdapterPopulatedRecordArray<any>
  ): Promise<any>;
  /**
   * The `queryRecord()` method is invoked when the store is asked for a single
   * record through a query object.
   */
  queryRecord<K extends keyof ModelRegistry>(
    store: Store,
    type: ModelSchema<K>,
    query: {}
  ): Promise<any>;
  /**
   * If the globally unique IDs for your records should be generated on the client,
   * implement the `generateIdForRecord()` method. This method will be invoked
   * each time you create a new record, and the value returned from it will be
   * assigned to the record's `primaryKey`.
   */
  generateIdForRecord<K extends keyof ModelRegistry>(
    store: Store,
    type: ModelSchema<K>,
    inputProperties: {}
  ): string | number;
  /**
   * Proxies to the serializer's `serialize` method.
   */
  serialize<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    options: {}
  ): {};
  /**
   * Implement this method in a subclass to handle the creation of
   * new records.
   */
  createRecord<K extends keyof ModelRegistry>(
    store: Store,
    type: ModelSchema<K>,
    snapshot: Snapshot<K>
  ): Promise<any>;
  /**
   * Implement this method in a subclass to handle the updating of
   * a record.
   */
  updateRecord<K extends keyof ModelRegistry>(
    store: Store,
    type: ModelSchema<K>,
    snapshot: Snapshot<K>
  ): Promise<any>;
  /**
   * Implement this method in a subclass to handle the deletion of
   * a record.
   */
  deleteRecord<K extends keyof ModelRegistry>(
    store: Store,
    type: ModelSchema<K>,
    snapshot: Snapshot<K>
  ): Promise<any>;
  /**
   * The store will call `findMany` instead of multiple `findRecord`
   * requests to find multiple records at once if coalesceFindRequests
   * is true.
   */
  findMany<K extends keyof ModelRegistry>(
    store: Store,
    type: ModelSchema<K>,
    ids: any[],
    snapshots: any[]
  ): Promise<any>;
  /**
   * Organize records into groups, each of which is to be passed to separate
   * calls to `findMany`.
   */
  groupRecordsForFindMany(store: Store, snapshots: any[]): any[];
  /**
   * This method is used by the store to determine if the store should
   * reload a record from the adapter when a record is requested by
   * `store.findRecord`.
   */
  shouldReloadRecord<K extends keyof ModelRegistry>(
    store: Store,
    snapshot: Snapshot<K>
  ): boolean;
  /**
   * This method is used by the store to determine if the store should
   * reload all records from the adapter when records are requested by
   * `store.findAll`.
   */
  shouldReloadAll<K extends keyof ModelRegistry>(
    store: Store,
    snapshotRecordArray: SnapshotRecordArray<K>
  ): boolean;
  /**
   * This method is used by the store to determine if the store should
   * reload a record after the `store.findRecord` method resolves a
   * cached record.
   */
  shouldBackgroundReloadRecord<K extends keyof ModelRegistry>(
    store: Store,
    snapshot: Snapshot<K>
  ): boolean;
  /**
   * This method is used by the store to determine if the store should
   * reload a record array after the `store.findAll` method resolves
   * with a cached record array.
   */
  shouldBackgroundReloadAll<K extends keyof ModelRegistry>(
    store: Store,
    snapshotRecordArray: SnapshotRecordArray<K>
  ): boolean;
}

// Instead of declaring `coalesceFindRequests` as a property we now declare it in an
// interface. This works around the issue noted here with TypeScript 4:
// https://github.com/microsoft/TypeScript/issues/40220
declare interface Adapter {
  /**
   * By default the store will try to coalesce all `fetchRecord` calls within the same runloop
   * into as few requests as possible by calling groupRecordsForFindMany and passing it into a findMany call.
   * You can opt out of this behaviour by either not implementing the findMany hook or by setting
   * coalesceFindRequests to false.
   */
  coalesceFindRequests: boolean;
}

export default Adapter;
export { BuildURLMixin };

import { AdapterRegistry } from "../adapter";
import ModelRegistry from "../types/registries/model";
import { SerializerRegistry } from "../serializer";
import Model from "../model";
import { RecordReference } from "../model";
import Service from "@ember/service";
import { Collection } from "./record-arrays";
import { EmptyResourceDocument, SingleResourceDocument, CollectionResourceDocument, JsonApiDocument } from "ember-data/serializer/json-api";

export interface FindOptions {
  reload?: boolean;
  backgroundReload?: boolean;
  include?: string;
  adapterOptions?: Record<string, unknown>;
  preload?: Record<string, unknown>;
}

/**
 * The store contains all of the data for records loaded from the server.
 * It is also responsible for creating instances of `DS.Model` that wrap
 * the individual data for a record, so that they can be bound to in your
 * Handlebars templates.
 */
declare class Store extends Service {
  /**
   * The default adapter to use to communicate to a backend server or
   * other persistence layer. This will be overridden by an application
   * adapter if present.
   */
  adapter: string;
  /**
   * Create a new record in the current store. The properties passed
   * to this method are set on the newly created record.
   */
  createRecord<K extends keyof ModelRegistry>(
    modelName: K,
    inputProperties?: {}
  ): ModelRegistry[K];
  /**
   * For symmetry, a record can be deleted via the store.
   */
  deleteRecord(record: Model): void;
  /**
   * For symmetry, a record can be unloaded via the store.
   * This will cause the record to be destroyed and freed up for garbage collection.
   */
  unloadRecord(record: Model): void;
  /**
   * This method returns a record for a given type and id combination.
   */
  findRecord<K extends keyof ModelRegistry>(
    modelName: K,
    id: string | number,
    options?: FindOptions
  ): Promise<ModelRegistry[K]>;
  /**
   * Get the reference for the specified record.
   */
  getReference<K extends keyof ModelRegistry>(
    modelName: K,
    id: string | number
  ): RecordReference<ModelRegistry[K]>;
  /**
   * Get a record by a given type and ID without triggering a fetch.
   */
  peekRecord<K extends keyof ModelRegistry>(
    modelName: K,
    id: string | number
  ): ModelRegistry[K] | null;
  /**
   * This method returns true if a record for a given modelName and id is already
   * loaded in the store. Use this function to know beforehand if a findRecord()
   * will result in a request or that it will be a cache hit.
   */
  hasRecordForId<K extends keyof ModelRegistry>(
    modelName: K,
    id: string | number
  ): boolean;
  /**
   * This method delegates a query to the adapter. This is the one place where
   * adapter-level semantics are exposed to the application.
   */
  query<K extends keyof ModelRegistry>(
    modelName: K,
    query: object,
    options?: { [key: string]: unknown; adapterOptions?: Record<string, unknown> }
  ): Promise<Collection<ModelRegistry[K]>>;
  /**
   * This method makes a request for one record, where the `id` is not known
   * beforehand (if the `id` is known, use [`findRecord`](#method_findRecord)
   * instead).
   */
  queryRecord<K extends keyof ModelRegistry>(
    modelName: K,
    query: Record<string, unknown>,
    options?: { adapterOptions?: object | undefined }
  ): Promise<ModelRegistry[K] | null>;
  /**
   * `findAll` asks the adapter's `findAll` method to find the records for the
   * given type, and returns a promise which will resolve with all records of
   * this type present in the store, even if the adapter only returns a subset
   * of them.
   */
  findAll<K extends keyof ModelRegistry>(
    modelName: K,
    options?: FindOptions
  ): Promise<Collection<ModelRegistry[K]>>;
  /**
   * This method returns a filtered array that contains all of the
   * known records for a given type in the store.
   */
  peekAll<K extends keyof ModelRegistry>(
    modelName: K
  ): Collection<ModelRegistry[K]>;
  /**
   * This method unloads all records in the store.
   * It schedules unloading to happen during the next run loop.
   */
  unloadAll<K extends keyof ModelRegistry>(modelName?: K): void;
  /**
   * DEPRECATED:
   * This method has been deprecated and is an alias for store.hasRecordForId, which should
   * be used instead.
   */
  recordIsLoaded<K extends keyof ModelRegistry>(
    modelName: K,
    id: string
  ): boolean;
  /**
   * Returns the model class for the particular `modelName`.
   */
  modelFor<K extends keyof ModelRegistry>(modelName: K): ModelRegistry[K];
  /**
   * Push some data for a given type into the store.
   */
  push(data: EmptyResourceDocument): null;
  push(data: SingleResourceDocument): Model;
  push(data: CollectionResourceDocument): Model[];
  push(data: JsonApiDocument): Model | Model[] | null;
  /**
   * Push some raw data into the store.
   */
  pushPayload<K extends keyof ModelRegistry>(
    modelName: K,
    inputPayload: {}
  ): any;
  pushPayload(inputPayload: {}): any;
  /**
   * `normalize` converts a json payload into the normalized form that
   * [push](#method_push) expects.
   */
  normalize<K extends keyof ModelRegistry>(modelName: K, payload: {}): {};
  /**
   * Returns an instance of the adapter for a given type. For
   * example, `adapterFor('person')` will return an instance of
   * `App.PersonAdapter`.
   */
  adapterFor<K extends keyof AdapterRegistry>(modelName: K): AdapterRegistry[K];
  /**
   * Returns an instance of the serializer for a given type. For
   * example, `serializerFor('person')` will return an instance of
   * `App.PersonSerializer`.
   */
  serializerFor<K extends keyof SerializerRegistry>(
    modelName: K
  ): SerializerRegistry[K];
}


export default Store;

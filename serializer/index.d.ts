import ModelRegistry from "../types/registries/model";
import Store from "../store";
import { ModelSchema } from "../model";
export { default as SerializerRegistry } from "../types/registries/serializer";
import { Snapshot } from "../legacy-compat";
import Ember from "ember";

/**
 * `DS.Serializer` is an abstract base class that you should override in your
 * application to customize it for your backend. The minimum set of methods
 * that you should implement is:
 */
declare class Serializer extends Ember.Object {
  /**
   * The `store` property is the application's `store` that contains
   * all records. It can be used to look up serializers for other model
   * types that may be nested inside the payload response.
   */
  store: Store;
  /**
   * The `normalizeResponse` method is used to normalize a payload from the
   * server to a JSON-API Document.
   */
  normalizeResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  /**
   * The `serialize` method is used when a record is saved in order to convert
   * the record into the form that your external data source expects.
   */
  serialize<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    options: {}
  ): {};
  /**
   * The `normalize` method is used to convert a payload received from your
   * external data source into the normalized form `store.push()` expects. You
   * should override this method, munge the hash and return the normalized
   * payload.
   */
  normalize(typeClass: ModelSchema, hash: {}): {};
}

export default Serializer;

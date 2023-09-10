import Serializer from ".";
import { Snapshot } from "../legacy-compat";
import { ModelSchema } from "../model";
import Store from "../store";
import ModelRegistry from "../types/registries/model";

/**
 * Ember Data 2.0 Serializer:
 */
declare class JSONSerializer extends Serializer {
  /**
   * The `primaryKey` is used when serializing and deserializing
   * data. Ember Data always uses the `id` property to store the id of
   * the record. The external source may not always follow this
   * convention. In these cases it is useful to override the
   * `primaryKey` property to match the `primaryKey` of your external
   * store.
   */
  primaryKey: string;
  /**
   * The `attrs` object can be used to declare a simple mapping between
   * property names on `DS.Model` records and payload keys in the
   * serialized JSON object representing the record. An object with the
   * property `key` can also be used to designate the attribute's key on
   * the response payload.
   */
  attrs: {};
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
  normalizeFindRecordResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeQueryRecordResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeFindAllResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeFindBelongsToResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeFindHasManyResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeFindManyResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeQueryResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeCreateRecordResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeDeleteRecordResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeUpdateRecordResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeSaveResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeSingleResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  normalizeArrayResponse(
    store: Store,
    primaryModelClass: ModelSchema,
    payload: {},
    id: string | number,
    requestType: string
  ): {};
  /**
   * Normalizes a part of the JSON payload returned by
   * the server. You should override this method, munge the hash
   * and call super if you have generic normalization to do.
   */
  normalize(typeClass: ModelSchema, hash: {}): {};
  /**
   * Returns the resource's ID.
   */
  extractId(modelClass: {}, resourceHash: {}): string;
  /**
   * Returns the resource's attributes formatted as a JSON-API "attributes object".
   */
  extractAttributes(modelClass: ModelSchema, resourceHash: {}): {};
  /**
   * Returns a relationship formatted as a JSON-API "relationship object".
   */
  extractRelationship(relationshipModelName: {}, relationshipHash: {}): {};
  /**
   * Returns a polymorphic relationship formatted as a JSON-API "relationship object".
   */
  extractPolymorphicRelationship(
    relationshipModelName: {},
    relationshipHash: {},
    relationshipOptions: {}
  ): {};
  /**
   * Returns the resource's relationships formatted as a JSON-API "relationships object".
   */
  extractRelationships(modelClass: ModelSchema, resourceHash: {}): {};
  modelNameFromPayloadKey(key: string): string;
  /**
   * Check if the given hasMany relationship should be serialized
   */
  shouldSerializeHasMany<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    key: string,
    relationshipType: string
  ): boolean;
  /**
   * Called when a record is saved in order to convert the
   * record into JSON.
   */
  serialize<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    options: {}
  ): {};
  /**
   * You can use this method to customize how a serialized record is added to the complete
   * JSON hash to be sent to the server. By default the JSON Serializer does not namespace
   * the payload and just sends the raw serialized JSON object.
   * If your server expects namespaced keys, you should consider using the RESTSerializer.
   * Otherwise you can override this method to customize how the record is added to the hash.
   * The hash property should be modified by reference.
   */
  serializeIntoHash<K extends keyof ModelRegistry>(
    hash: {},
    typeClass: ModelSchema<K>,
    snapshot: Snapshot<K>,
    options?: {}
  ): any;
  /**
   * `serializeAttribute` can be used to customize how `DS.attr`
   * properties are serialized
   */
  serializeAttribute<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    json: {},
    key: string,
    attribute: {}
  ): any;
  /**
   * `serializeBelongsTo` can be used to customize how `DS.belongsTo`
   * properties are serialized.
   */
  serializeBelongsTo<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    json: {},
    relationship: {}
  ): any;
  /**
   * `serializeHasMany` can be used to customize how `DS.hasMany`
   * properties are serialized.
   */
  serializeHasMany<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    json: {},
    relationship: {}
  ): any;
  /**
   * You can use this method to customize how polymorphic objects are
   * serialized. Objects are considered to be polymorphic if
   * `{ polymorphic: true }` is pass as the second argument to the
   * `DS.belongsTo` function.
   */
  serializePolymorphicType<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    json: {},
    relationship: {}
  ): any;
  /**
   * `extractMeta` is used to deserialize any meta information in the
   * adapter payload. By default Ember Data expects meta information to
   * be located on the `meta` property of the payload object.
   */
  extractMeta(store: Store, modelClass: ModelSchema, payload: {}): any;
  /**
   * `extractErrors` is used to extract model errors when a call
   * to `DS.Model#save` fails with an `InvalidError`. By default
   * Ember Data expects error information to be located on the `errors`
   * property of the payload object.
   */
  extractErrors(
    store: Store,
    typeClass: ModelSchema,
    payload: {},
    id: string | number
  ): {};
  /**
   * `keyForAttribute` can be used to define rules for how to convert an
   * attribute name in your model to a key in your JSON.
   */
  keyForAttribute(key: string, method: string): string;
  /**
   * `keyForRelationship` can be used to define a custom key when
   * serializing and deserializing relationship properties. By default
   * `JSONSerializer` does not provide an implementation of this method.
   */
  keyForRelationship(key: string, typeClass: string, method: string): string;
  /**
   * `keyForLink` can be used to define a custom key when deserializing link
   * properties.
   */
  keyForLink(key: string, kind: string): string;
  modelNameFromPayloadType(type: string): string;
  /**
   * serializeId can be used to customize how id is serialized
   * For example, your server may expect integer datatype of id
   */
  serializeId<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    json: {},
    primaryKey: string
  ): any;
}

export default JSONSerializer;

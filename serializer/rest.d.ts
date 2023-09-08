import { ModelSchema } from "../model";
import Store from "../store";
import JSONSerializer from "./json";
import ModelRegistry from "../types/registries/model";
import { Snapshot } from "../legacy-compat";

/**
     * Normally, applications will use the `RESTSerializer` by implementing
     * the `normalize` method.
     */
declare class RESTSerializer extends JSONSerializer {
  /**
   * `keyForPolymorphicType` can be used to define a custom key when
   * serializing and deserializing a polymorphic type. By default, the
   * returned key is `${key}Type`.
   */
  keyForPolymorphicType(key: string, typeClass: string, method: string): string;
  /**
   * Normalizes a part of the JSON payload returned by
   * the server. You should override this method, munge the hash
   * and call super if you have generic normalization to do.
   */
  normalize(modelClass: ModelSchema, resourceHash: {}, prop?: string): {};
  /**
   * This method allows you to push a payload containing top-level
   * collections of records organized per type.
   */
  pushPayload(store: Store, payload: {}): any;
  /**
   * This method is used to convert each JSON root key in the payload
   * into a modelName that it can use to look up the appropriate model for
   * that part of the payload.
   */
  modelNameFromPayloadKey(key: string): string;
  /**
   * Called when a record is saved in order to convert the
   * record into JSON.
   */
  serialize<K extends keyof ModelRegistry>(snapshot: Snapshot<K>, options: {}): {};
  /**
   * You can use this method to customize the root keys serialized into the JSON.
   * The hash property should be modified by reference (possibly using something like _.extend)
   * By default the REST Serializer sends the modelName of a model, which is a camelized
   * version of the name.
   */
  serializeIntoHash<K extends keyof ModelRegistry>(
      hash: {},
      typeClass: ModelSchema<K>,
      snapshot: Snapshot<K>,
      options?: {},
  ): any;
  /**
   * You can use `payloadKeyFromModelName` to override the root key for an outgoing
   * request. By default, the RESTSerializer returns a camelized version of the
   * model's name.
   */
  payloadKeyFromModelName<K extends keyof ModelRegistry>(modelName: K): string;
  /**
   * You can use this method to customize how polymorphic objects are serialized.
   * By default the REST Serializer creates the key by appending `Type` to
   * the attribute and value from the model's camelcased model name.
   */
  serializePolymorphicType<K extends keyof ModelRegistry>(snapshot: Snapshot<K>, json: {}, relationship: {}): any;
  /**
   * You can use this method to customize how a polymorphic relationship should
   * be extracted.
   */
  extractPolymorphicRelationship(relationshipType: {}, relationshipHash: {}, relationshipOptions: {}): {};
  /**
   * `modelNameFromPayloadType` can be used to change the mapping for a DS model
   * name, taken from the value in the payload.
   */
  modelNameFromPayloadType(payloadType: string): string;
  /**
   * `payloadTypeFromModelName` can be used to change the mapping for the type in
   * the payload, taken from the model name.
   */
  payloadTypeFromModelName<K extends keyof ModelRegistry>(modelName: K): string;
}

export default RESTSerializer;

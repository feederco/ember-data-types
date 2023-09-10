import JSONSerializer from "./json";
import ModelRegistry from "../types/registries/model";
import Store from "ember-data/store";

// json-api types
// from: https://github.com/emberjs/data/blob/v5.2.0/ember-data-types/q/ember-data-json-api.ts

export type Meta = Record<string, JSONValue>;
export type LinkObject = { href: string; meta?: Record<string, JSONValue> };
export type Link = string | LinkObject;
export interface Links {
  related?: Link;
  self?: Link;
}
export interface PaginationLinks extends Links {
  first?: Link | null;
  last?: Link | null;
  prev?: Link | null;
  next?: Link | null;
}

// Ember imports this from: https://www.npmjs.com/package/json-typescript
type JSONValue = any;

export interface NewResourceIdentifierObject {
  id: string | null;
  type: string;
  lid: string;
}

export interface SingleResourceRelationship {
  data?: ExistingResourceIdentifierObject | NewResourceIdentifierObject | null;
  meta?: Record<string, JSONValue>;
  links?: Links;
}

export interface CollectionResourceRelationship {
  data?: Array<ExistingResourceIdentifierObject | NewResourceIdentifierObject>;
  meta?: Record<string, JSONValue>;
  links?: PaginationLinks;
}


export interface ExistingResourceIdentifierObject {
  id: string;
  type: string;
  lid?: string;
  meta?: Meta;
}

export interface ExistingResourceObject extends ExistingResourceIdentifierObject {
  meta?: Record<string, JSONValue>;
  attributes?: Record<string, JSONValue>;
  relationships?: Record<string, SingleResourceRelationship | CollectionResourceRelationship>;
  links?: Links;
}

interface Document {
  meta?: Record<string, JSONValue>;
  included?: ExistingResourceObject[];
  jsonapi?: Record<string, JSONValue>;
  links?: Links | PaginationLinks;
  errors?: JSONValue[];
}

export interface EmptyResourceDocument extends Document {
  data: null;
}

export interface SingleResourceDocument extends Document {
  data: ExistingResourceObject;
}

export interface CollectionResourceDocument extends Document {
  data: ExistingResourceObject[];
}

export type JSONAPIMeta = Record<string, JSONValue>;
export type JSONAPILinkObject = { href: string; meta?: Record<string, JSONValue> };
export type JSONAPILink = string | JSONAPILinkObject;

export interface JSONAPILinks {
  related?: JSONAPILink;
  self?: JSONAPILink;
}
export interface JSONAPIPaginationLinks extends JSONAPILinks {
  first?: JSONAPILink | null;
  last?: JSONAPILink | null;
  prev?: JSONAPILink | null;
  next?: JSONAPILink | null;
}

export type JsonApiDocument = EmptyResourceDocument | SingleResourceDocument | CollectionResourceDocument;

/**
 * Ember Data 2.0 Serializer:
 */
declare class JSONAPISerializer extends JSONSerializer {
  pushPayload(store: Store, payload: {}): any;
  /**
   * Dasherizes and singularizes the model name in the payload to match
   * the format Ember Data uses internally for the model name.
   */
  modelNameFromPayloadKey(key: string): string;
  /**
   * Converts the model name to a pluralized version of the model name.
   */
  payloadKeyFromModelName<K extends keyof ModelRegistry>(modelName: K): string;
  /**
   * `keyForAttribute` can be used to define rules for how to convert an
   * attribute name in your model to a key in your JSON.
   * By default `JSONAPISerializer` follows the format used on the examples of
   * http://jsonapi.org/format and uses dashes as the word separator in the JSON
   * attribute keys.
   */
  keyForAttribute(key: string, method: string): string;
  /**
   * `keyForRelationship` can be used to define a custom key when
   * serializing and deserializing relationship properties.
   * By default `JSONAPISerializer` follows the format used on the examples of
   * http://jsonapi.org/format and uses dashes as word separators in
   * relationship properties.
   */
  keyForRelationship(key: string, typeClass: string, method: string): string;
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

export default JSONAPISerializer;

import AdapterError from '../adapter/error';
import Store, { FindOptions } from '../store';
import ModelRegistry from '../types/registries/model';
import Transform from '../transform';
import TransformRegistry from '../types/registries/transform';
import Ember from 'ember';
import Evented from '@ember/object/evented';
import { Collection } from "../store/record-arrays";

// Snapshot

declare class SnapshotRecordArray<K extends keyof ModelRegistry> {
  /**
   * Number of records in the array
   */
  length: number;
  /**
   * Meta objects for the record array.
   */
  meta: {};
  /**
   * A hash of adapter options passed into the store method for this request.
   */
  adapterOptions: {};
  /**
   * The relationships to include for this request.
   */
  include: string | any[];
  /**
   * The type of the underlying records for the snapshots in the array, as a DS.Model
   */
  type: ModelRegistry[K];
  /**
   * Get snapshots of the underlying record array
   */
  snapshots(): Snapshot[];
}

declare class Snapshot<K extends keyof ModelRegistry = keyof ModelRegistry> {
  /**
   * The underlying record for this snapshot. Can be used to access methods and
   * properties defined on the record.
   */
  record: ModelRegistry[K];
  /**
   * The id of the snapshot's underlying record
   */
  id: string;
  /**
   * A hash of adapter options
   */
  adapterOptions: Record<string, unknown>;
  /**
   * The name of the type of the underlying record for this snapshot, as a string.
   */
  modelName: K;
  /**
   * The type of the underlying record for this snapshot, as a DS.Model.
   */
  type: ModelRegistry[K];
  /**
   * Returns the value of an attribute.
   */
  attr<L extends AttributesFor<ModelRegistry[K]>>(
    keyName: L
  ): ModelRegistry[K][L];
  /**
   * Returns all attributes and their corresponding values.
   */
  attributes(): { [L in keyof ModelRegistry[K]]: ModelRegistry[K][L] };
  /**
   * Returns all changed attributes and their old and new values.
   */
  changedAttributes(): Partial<{
    [L in keyof ModelRegistry[K]]: ModelRegistry[K][L];
  }>;
  /**
   * Returns the current value of a belongsTo relationship.
   */
  belongsTo<L extends RelationshipsFor<ModelRegistry[K]>>(
    keyName: L,
    options?: {}
  ): Snapshot | null | undefined;
  belongsTo<L extends RelationshipsFor<ModelRegistry[K]>>(
    keyName: L,
    options: { id: true }
  ): string | null | undefined;

  /**
   * Returns the current value of a hasMany relationship.
   */
  hasMany<L extends RelationshipsFor<ModelRegistry[K]>>(
    keyName: L,
    options?: { ids: false }
  ): Snapshot[] | undefined;
  hasMany<L extends RelationshipsFor<ModelRegistry[K]>>(
    keyName: L,
    options: { ids: true }
  ): string[] | undefined;
  /**
   * Iterates through all the attributes of the model, calling the passed
   * function on each attribute.
   */
  eachAttribute<M extends ModelRegistry[K]>(
    callback: (key: ModelKeys<M>, meta: AttributeMeta<M>) => void,
    binding?: {}
  ): void;
  /**
   * Iterates through all the relationships of the model, calling the passed
   * function on each relationship.
   */
  eachRelationship<M extends ModelRegistry[K]>(
    callback: (key: ModelKeys<M>, meta: RelationshipMeta<M>) => void,
    binding?: {}
  ): void;
  /**
   * Serializes the snapshot using the serializer for the model.
   */
  serialize<O extends object>(options: O): object;
}

// Errors

interface Errors extends Ember.Enumerable<any>, Evented {}

declare class Errors extends Ember.ArrayProxy<any> {
  /**
   * DEPRECATED:
   * Register with target handler
   */
  registerHandlers(
    target: {},
    becameInvalid: Function,
    becameValid: Function
  ): any;
  /**
   * Returns errors for a given attribute
   */
  errorsFor(attribute: string): any[];
  /**
   * An array containing all of the error messages for this
   * record. This is useful for displaying all errors to the user.
   */
  messages: Ember.ComputedProperty<any[]>;
  /**
   * Total number of errors.
   */
  length: Ember.ComputedProperty<number>;
  isEmpty: Ember.ComputedProperty<boolean>;
  /**
   * DEPRECATED:
   * Adds error messages to a given attribute and sends
   * `becameInvalid` event to the record.
   */
  add(attribute: string, messages: any[] | string): any;
  /**
   * DEPRECATED:
   * Removes all error messages from the given attribute and sends
   * `becameValid` event to the record if there no more errors left.
   */
  remove(attribute: string): any;
  /**
   * DEPRECATED:
   * Removes all error messages and sends `becameValid` event
   * to the record.
   */
  clear(): any;
  /**
   * Checks if there is error messages for the given attribute.
   */
  has(attribute: string): boolean;
}

// Attr

interface AttrOptions<T> {
  defaultValue?: T extends Exclude<object, null>
    ? () => T
    : T | (() => T) | null | undefined;
  allowNull?: boolean | undefined; // TODO: restrict to boolean transform (TS 2.8)
  [key: string]: unknown;
}

// The TransformRegistry should really only contain transforms, but historically people have just put the return type directly in.
type TransformType<K extends keyof TransformRegistry> =
  TransformRegistry[K] extends Transform
    ? ReturnType<TransformRegistry[K]["deserialize"]>
    : TransformRegistry[K];

/**
 * `DS.attr` defines an attribute on a [DS.Model](/api/data/classes/DS.Model.html).
 * By default, attributes are passed through as-is, however you can specify an
 * optional type to have the value automatically transformed.
 * Ember Data ships with four basic transform types: `string`, `number`,
 * `boolean` and `date`. You can define your own transforms by subclassing
 * [DS.Transform](/api/data/classes/DS.Transform.html).
 */
declare function attr<K extends keyof TransformRegistry>(
  type: K,
  options?: AttrOptions<TransformType<K>>
): Ember.ComputedProperty<TransformType<K>>;

declare function attr(options?: AttrOptions<any>): Ember.ComputedProperty<any>;
declare function attr(target: any, propertyKey: string): void;

// Relationships
declare class PromiseManyArray<T> {
  promise: Promise<ManyArray<T>> | null;
  isDestroyed: boolean;
  content: T | null;
  get length(): number;
  forEach(cb: (item: T, index: number) => void): void;
  reload(options: FindOptions): Promise<ManyArray<T>>;
  isPending: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isSettled: boolean;
  then(
    onFulfill: (value: ManyArray<T>) => void,
    onReject?: (reason: any) => void
  ): Promise<ManyArray<T>>;
  catch(onReject: (reason: any) => void): Promise<ManyArray<T>>;
  finally(callback: () => void): Promise<ManyArray<T>>;
  destroy(): void;
  links: any | null;
  meta: any | null;
}


export interface RelationshipMetaOptions {
  async?: boolean | undefined;
  inverse?: string | undefined;
  polymorphic?: boolean | undefined;
  [k: string]: any;
}
export interface RelationshipMeta<ModelT extends Model> {
  key: RelationshipsFor<ModelT>;
  kind: "belongsTo" | "hasMany";
  type: keyof ModelRegistry;
  options: RelationshipMetaOptions;
  name: string;
  parentType: ModelT;
  isRelationship: true;
}

interface RelationshipOptions<M extends Model> {
  async: boolean | undefined;
  inverse: RelationshipsFor<M> | null | undefined;
  polymorphic?: boolean | undefined;
  as?: string;
  [key: string]: unknown;
}

interface Sync {
  async: false;
}
interface Async {
  async?: true | undefined;
}

type AsyncBelongsTo<T extends Model | null> = Promise<T>;

/**
 * `DS.belongsTo` is used to define One-To-One and One-To-Many
 * relationships on a [DS.Model](/api/data/classes/DS.Model.html).
 */
declare function belongsTo<K extends keyof ModelRegistry>(
  modelName: K,
  options: RelationshipOptions<ModelRegistry[K]> & Sync
): Ember.ComputedProperty<
  ModelRegistry[K] | null,
  ModelRegistry[K] | Promise<ModelRegistry[K] | null> | null
>;

declare function belongsTo<K extends keyof ModelRegistry>(
  modelName: K,
  options?: RelationshipOptions<ModelRegistry[K]> & Async
): Ember.ComputedProperty<
  AsyncBelongsTo<ModelRegistry[K] | null>,
  ModelRegistry[K] | Promise<ModelRegistry[K] | null> | null
>;

type AsyncHasMany<T extends Model> = Promise<PromiseManyArray<T>>;
type SyncHasMany<T extends Model> = ManyArray<T>;

/**
 * `DS.hasMany` is used to define One-To-Many and Many-To-Many
 * relationships on a [DS.Model](/api/data/classes/DS.Model.html).
 */
declare function hasMany<K extends keyof ModelRegistry>(
  type: K,
  options: RelationshipOptions<ModelRegistry[K]> & Sync
): Ember.ComputedProperty<SyncHasMany<ModelRegistry[K]>>;

declare function hasMany<K extends keyof ModelRegistry>(
  type: K,
  options?: RelationshipOptions<ModelRegistry[K]> & Async
): Ember.ComputedProperty<
  AsyncHasMany<ModelRegistry[K]>,
  Ember.Array<ModelRegistry[K]>
>;

/**
 * A BelongsToReference is a low level API that allows users and
 * addon author to perform meta-operations on a belongs-to
 * relationship.
 */
declare class BelongsToReference {
  /**
   * This returns a string that represents how the reference will be
   * looked up when it is loaded. If the relationship has a link it will
   * use the "link" otherwise it defaults to "id".
   */
  remoteType(): string;
  /**
   * The `id` of the record that this reference refers to. Together, the
   * `type()` and `id()` methods form a composite key for the identity
   * map. This can be used to access the id of an async relationship
   * without triggering a fetch that would normally happen if you
   * attempted to use `record.get('relationship.id')`.
   */
  id(): string;
  /**
   * The link Ember Data will use to fetch or reload this belongs-to
   * relationship.
   */
  link(): string;
  /**
   * The meta data for the belongs-to relationship.
   */
  meta(): {};
  /**
   * `push` can be used to update the data in the relationship and Ember
   * Data will treat the new data as the conanical value of this
   * relationship on the backend.
   */
  push(objectOrPromise: {} | Promise<any>): Promise<any>;
  /**
   * `value()` synchronously returns the current value of the belongs-to
   * relationship. Unlike `record.get('relationshipName')`, calling
   * `value()` on a reference does not trigger a fetch if the async
   * relationship is not yet loaded. If the relationship is not loaded
   * it will always return `null`.
   */
  value(): Model | null;
  /**
   * Loads a record in a belongs to relationship if it is not already
   * loaded. If the relationship is already loaded this method does not
   * trigger a new load.
   */
  load(): Promise<any>;
  /**
   * Triggers a reload of the value in this relationship. If the
   * remoteType is `"link"` Ember Data will use the relationship link to
   * reload the relationship. Otherwise it will reload the record by its
   * id.
   */
  reload(): Promise<any>;
}
/**
 * A HasManyReference is a low level API that allows users and addon
 * author to perform meta-operations on a has-many relationship.
 */
declare class HasManyReference<T> {
  /**
   * This returns a string that represents how the reference will be
   * looked up when it is loaded. If the relationship has a link it will
   * use the "link" otherwise it defaults to "id".
   */
  remoteType(): string;
  /**
   * The link Ember Data will use to fetch or reload this has-many
   * relationship.
   */
  link(): string;
  /**
   * `ids()` returns an array of the record ids in this relationship.
   */
  ids(): string[];
  /**
   * The meta data for the has-many relationship.
   */
  meta(): {};
  /**
   * `push` can be used to update the data in the relationship and Ember
   * Data will treat the new data as the canonical value of this
   * relationship on the backend.
   */
  push(objectOrPromise: T[] | Promise<T[]>): ManyArray<T>;
  /**
   * `value()` synchronously returns the current value of the has-many
   * relationship. Unlike `record.get('relationshipName')`, calling
   * `value()` on a reference does not trigger a fetch if the async
   * relationship is not yet loaded. If the relationship is not loaded
   * it will always return `null`.
   */
  value(): ManyArray<T> | null;
  /**
   * Loads the relationship if it is not already loaded.  If the
   * relationship is already loaded this method does not trigger a new
   * load.
   */
  load(): Promise<any>;
  /**
   * Reloads this has-many relationship.
   */
  reload(): Promise<any>;
}
/**
 * An RecordReference is a low level API that allows users and
 * addon author to perform meta-operations on a record.
 */
declare class RecordReference<T extends Model> {
  /**
   * The `id` of the record that this reference refers to.
   */
  id(): string;
  /**
   * How the reference will be looked up when it is loaded: Currently
   * this always return `identity` to signifying that a record will be
   * loaded by the `type` and `id`.
   */
  remoteType(): string;
  /**
   * This API allows you to provide a reference with new data. The
   * simplest usage of this API is similar to `store.push`: you provide a
   * normalized hash of data and the object represented by the reference
   * will update.
   */
  push(payload: Promise<any> | {}): Promise<T>;
  /**
   * If the entity referred to by the reference is already loaded, it is
   * present as `reference.value`. Otherwise the value returned by this function
   * is `null`.
   */
  value(): T | null;
  /**
   * Triggers a fetch for the backing entity based on its `remoteType`
   * (see `remoteType` definitions per reference type).
   */
  load(): Promise<T>;
  /**
   * Reloads the record if it is already loaded. If the record is not
   * loaded it will load the record via `store.findRecord`
   */
  reload(): Promise<T>;
}
/**
 * A `ManyArray` is a `MutableArray` that represents the contents of a has-many
 * relationship.
 */
// tslint:disable-next-line:no-empty-interface -- used for declaration merge
declare interface ManyArray<T> extends Collection<T> {}

// Model

/**
   * The model class that all Ember Data records descend from.
   * This is the public API of Ember Data models. If you are using Ember Data
   * in your application, this is the class you should use.
   * If you are working on Ember Data internals, you most likely want to be dealing
   * with `InternalModel`
   */
declare class Model extends Ember.Object {
  /**
   * If this property is `true` the record is in the `empty`
   * state. Empty is the first state all records enter after they have
   * been created. Most records created by the store will quickly
   * transition to the `loading` state if data needs to be fetched from
   * the server or the `created` state if the record is created on the
   * client. A record can also enter the empty state if the adapter is
   * unable to locate the record.
   */
  isEmpty: Ember.ComputedProperty<boolean>;
  /**
   * If this property is `true` the record is in the `loading` state. A
   * record enters this state when the store asks the adapter for its
   * data. It remains in this state until the adapter provides the
   * requested data.
   */
  isLoading: Ember.ComputedProperty<boolean>;
  /**
   * If this property is `true` the record is in the `loaded` state. A
   * record enters this state when its data is populated. Most of a
   * record's lifecycle is spent inside substates of the `loaded`
   * state.
   */
  isLoaded: Ember.ComputedProperty<boolean>;
  /**
   * If this property is `true` the record is in the `dirty` state. The
   * record has local changes that have not yet been saved by the
   * adapter. This includes records that have been created (but not yet
   * saved) or deleted.
   */
  hasDirtyAttributes: Ember.ComputedProperty<boolean>;
  /**
   * If this property is `true` the record is in the `saving` state. A
   * record enters the saving state when `save` is called, but the
   * adapter has not yet acknowledged that the changes have been
   * persisted to the backend.
   */
  isSaving: Ember.ComputedProperty<boolean>;
  /**
   * If this property is `true` the record is in the `deleted` state
   * and has been marked for deletion. When `isDeleted` is true and
   * `hasDirtyAttributes` is true, the record is deleted locally but the deletion
   * was not yet persisted. When `isSaving` is true, the change is
   * in-flight. When both `hasDirtyAttributes` and `isSaving` are false, the
   * change has persisted.
   */
  isDeleted: Ember.ComputedProperty<boolean>;
  /**
   * If this property is `true` the record is in the `new` state. A
   * record will be in the `new` state when it has been created on the
   * client and the adapter has not yet report that it was successfully
   * saved.
   */
  isNew: Ember.ComputedProperty<boolean>;
  /**
   * If this property is `true` the record is in the `valid` state.
   */
  isValid: Ember.ComputedProperty<boolean>;
  /**
   * If the record is in the dirty state this property will report what
   * kind of change has caused it to move into the dirty
   * state. Possible values are:
   */
  dirtyType: Ember.ComputedProperty<string>;
  /**
   * If `true` the adapter reported that it was unable to save local
   * changes to the backend for any reason other than a server-side
   * validation error.
   */
  isError: boolean;
  /**
   * If `true` the store is attempting to reload the record from the adapter.
   */
  isReloading: boolean;
  /**
   * All ember models have an id property. This is an identifier
   * managed by an external source. These are always coerced to be
   * strings before being used internally. Note when declaring the
   * attributes for a model it is an error to declare an id
   * attribute.
   */
  id: string;
  /**
   * A reference to Store service instance.
   */
  store: Store;
  /**
   * When the record is in the `invalid` state this object will contain
   * any errors returned by the adapter. When present the errors hash
   * contains keys corresponding to the invalid property names
   * and values which are arrays of Javascript objects with two keys:
   */
  errors: Errors;
  /**
   * This property holds the `AdapterError` object with which
   * last adapter operation was rejected.
   */
  adapterError: AdapterError;
  /**
   * Create a JSON representation of the record, using the serialization
   * strategy of the store's adapter.
   */
  serialize(options?: { includeId?: boolean | undefined }): object;
  /**
   * Use [JSONSerializer](JSONSerializer.html) to
   * get the JSON representation of a record.
   */
  toJSON(options?: { includeId?: boolean | undefined }): object;
  /**
   * Fired when the record is ready to be interacted with,
   * that is either loaded from the server or created locally.
   */
  ready(): void;
  /**
   * Fired when the record is loaded from the server.
   */
  didLoad(): void;
  /**
   * Fired when the record is updated.
   */
  didUpdate(): void;
  /**
   * Fired when a new record is commited to the server.
   */
  didCreate(): void;
  /**
   * Fired when the record is deleted.
   */
  didDelete(): void;
  /**
   * Fired when the record becomes invalid.
   */
  becameInvalid(): void;
  /**
   * Fired when the record enters the error state.
   */
  becameError(): void;
  /**
   * Fired when the record is rolled back.
   */
  rolledBack(): void;
  /**
   * Marks the record as deleted but does not save it. You must call
   * `save` afterwards if you want to persist it. You might use this
   * method if you want to allow the user to still `rollbackAttributes()`
   * after a delete was made.
   */
  deleteRecord(): void;
  /**
   * Same as `deleteRecord`, but saves the record immediately.
   */
  destroyRecord(options?: {
    adapterOptions?: object | undefined;
  }): Promise<this>;
  /**
   * Unloads the record from the store. This will cause the record to be destroyed and freed up for garbage collection.
   */
  unloadRecord(): void;
  /**
   * Returns an object, whose keys are changed properties, and value is
   * an [oldProp, newProp] array.
   */
  changedAttributes(): ChangedAttributes;
  /**
   * If the model `hasDirtyAttributes` this function will discard any unsaved
   * changes. If the model `isNew` it will be removed from the store.
   */
  rollbackAttributes(): void;
  /**
   * Save the record and persist any changes to the record to an
   * external source via the adapter.
   */
  save(options?: { adapterOptions?: object | undefined }): Promise<this>;
  /**
   * Reload the record from the adapter.
   */
  reload(options?: {
    adapterOptions?: object | undefined;
  }): Promise<this>;
  /**
   * Get the reference for the specified belongsTo relationship.
   */
  belongsTo(name: RelationshipsFor<this>): BelongsToReference;
  /**
   * Get the reference for the specified hasMany relationship.
   */
  hasMany(name: RelationshipsFor<this>): HasManyReference<any>;
  /**
   * Given a callback, iterates over each of the relationships in the model,
   * invoking the callback with the name of each relationship and its relationship
   * descriptor.
   */
  eachRelationship<T extends Model>(
    this: T,
    callback: (name: ModelKeys<T>, details: RelationshipMeta<T>) => void,
    binding?: any
  ): void;
  /**
   * Represents the model's class name as a string. This can be used to look up the model's class name through
   * `Store`'s modelFor method.
   */
  static modelName: keyof ModelRegistry;
  /**
   * For a given relationship name, returns the model type of the relationship.
   */
  static typeForRelationship<K extends keyof ModelRegistry>(
    name: K,
    store: Store
  ): ModelRegistry[K];
  /**
   * Find the relationship which is the inverse of the one asked for.
   */
  static inverseFor<K extends keyof ModelRegistry>(name: K, store: Store): {};
  /**
   * The model's relationships as a map, keyed on the type of the
   * relationship. The value of each entry is an array containing a descriptor
   * for each relationship with that type, describing the name of the relationship
   * as well as the type.
   */
  static relationships: Ember.ComputedProperty<Map<string, unknown>>;
  /**
   * A hash containing lists of the model's relationships, grouped
   * by the relationship kind. For example, given a model with this
   * definition:
   */
  static relationshipNames: Ember.ComputedProperty<{}>;
  /**
   * An array of types directly related to a model. Each type will be
   * included once, regardless of the number of relationships it has with
   * the model.
   */
  static relatedTypes: Ember.ComputedProperty<Ember.NativeArray<string>>;
  /**
   * A map whose keys are the relationships of a model and whose values are
   * relationship descriptors.
   */
  static relationshipsByName: Ember.ComputedProperty<Map<string, unknown>>;
  /**
   * A map whose keys are the fields of the model and whose values are strings
   * describing the kind of the field. A model's fields are the union of all of its
   * attributes and relationships.
   */
  static fields: Ember.ComputedProperty<Map<string, unknown>>;
  /**
   * Given a callback, iterates over each of the relationships in the model,
   * invoking the callback with the name of each relationship and its relationship
   * descriptor.
   */
  static eachRelationship<M extends Model = Model>(
    callback: (name: ModelKeys<M>, details: RelationshipMeta<M>) => void,
    binding?: any
  ): void;
  /**
   * Given a callback, iterates over each of the types related to a model,
   * invoking the callback with the related type's class. Each type will be
   * returned just once, regardless of how many different relationships it has
   * with a model.
   */
  static eachRelatedType(
    callback: (name: string) => void,
    binding?: any
  ): void;
  /**
   * A map whose keys are the attributes of the model (properties
   * described by attr) and whose values are the meta object for the
   * property.
   */
  static attributes: Ember.ComputedProperty<Map<string, unknown>>;
  /**
   * A map whose keys are the attributes of the model (properties
   * described by attr) and whose values are type of transformation
   * applied to each attribute. This map does not include any
   * attributes that do not have an transformation type.
   */
  static transformedAttributes: Ember.ComputedProperty<Map<string, unknown>>;
  /**
   * Iterates through the attributes of the model, calling the passed function on each
   * attribute.
   */
  static eachAttribute<
    Class extends typeof Model,
    M extends InstanceType<Class>
  >(
    this: Class,
    callback: (name: ModelKeys<M>, meta: AttributeMeta<M>) => void,
    binding?: any
  ): void;
  /**
   * Iterates through the transformedAttributes of the model, calling
   * the passed function on each attribute. Note the callback will not be
   * called for any attributes that do not have an transformation type.
   */
  static eachTransformedAttribute<Class extends typeof Model>(
    this: Class,
    callback: (
      name: ModelKeys<InstanceType<Class>>,
      type: keyof TransformRegistry
    ) => void,
    binding?: any
  ): void;
}

/**
  The keys from the actual Model class, removing all the keys which come from
  the base class.
*/
export type ModelKeys<ModelT extends Model> = Exclude<keyof ModelT, keyof Model>;

export type AttributesFor<ModelT extends Model> = ModelKeys<ModelT>; // TODO: filter to attr properties only (TS 2.8)
export type RelationshipsFor<ModelT extends Model> = ModelKeys<ModelT>; // TODO: filter to hasMany/belongsTo properties only (TS 2.8)

export interface ChangedAttributes {
  [key: string]: [any, any] | undefined;
}
interface AttributeMeta<ModelT extends Model> {
  type: keyof TransformRegistry;
  options: object;
  name: AttributesFor<ModelT>;
  parentType: Model;
  isAttribute: true;
}

export interface ModelSchema<
  ModelName extends keyof ModelRegistry = keyof ModelRegistry
> {
  modelName: ModelName;
  fields: Map<string, "attribute" | "belongsTo" | "hasMany">;
  attributes: Map<string, AttributeSchema>;
  relationshipsByName: Map<string, RelationshipSchema>;
  eachAttribute<T>(
    callback: (this: T, key: string, attribute: AttributeSchema) => void,
    binding?: T
  ): void;
  eachRelationship<T>(
    callback: (this: T, key: string, relationship: RelationshipSchema) => void,
    binding?: T
  ): void;
  eachTransformedAttribute<T>(
    callback: (this: T, key: string, relationship: RelationshipSchema) => void,
    binding?: T
  ): void;
}

export interface RelationshipSchema {
  name: string; // property key for this relationship
  kind: "belongsTo" | "hasMany";
  type: string; // related type
  options: {
    async: boolean;
    polymorphic?: boolean;
    as?: string;
    inverse: string | null; // property key on the related type (if any)
    [key: string]: unknown;
  };
}
export interface AttributeSchema {
  name: string;
  kind?: "attribute";
  options?: Record<string, unknown>;
  type?: string;
}

export default Model;
export {
  attr,
  belongsTo,
  hasMany,

  AsyncBelongsTo,
  AsyncHasMany,
  SyncHasMany,
  BelongsToReference,
  HasManyReference,
  RecordReference,
  ManyArray,
  PromiseManyArray,

  AttrOptions,

  Errors,

  SnapshotRecordArray,
  Snapshot,
};


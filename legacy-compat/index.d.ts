import ModelRegistry from "../types/registries/model";

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

export {
  SnapshotRecordArray,
  Snapshot,
}

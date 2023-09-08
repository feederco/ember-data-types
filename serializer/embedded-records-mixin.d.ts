import { Snapshot } from "../legacy-compat";
import { ModelSchema } from "../model";
import ModelRegistry from "../types/registries/model";

/**
 * ## Using Embedded Records
 */
declare class EmbeddedRecordsMixin {
  /**
   * Normalize the record and recursively normalize/extract all the embedded records
   * while pushing them into the store as they are encountered
   */
  normalize(typeClass: ModelSchema, hash: {}, prop: string): {};
  /**
   * Serialize `belongsTo` relationship when it is configured as an embedded object.
   */
  serializeBelongsTo<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    json: {},
    relationship: {}
  ): any;
  /**
   * Serializes `hasMany` relationships when it is configured as embedded objects.
   */
  serializeHasMany<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    json: {},
    relationship: {}
  ): any;
  /**
   * When serializing an embedded record, modify the property (in the json payload)
   * that refers to the parent record (foreign key for relationship).
   */
  removeEmbeddedForeignKey<K extends keyof ModelRegistry>(
    snapshot: Snapshot<K>,
    embeddedSnapshot: Snapshot<K>,
    relationship: {},
    json: {}
  ): any;
}
export default EmbeddedRecordsMixin;

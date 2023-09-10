import Ember from "ember";
import { AttrOptions } from "../model/attr";

/**
 * The `DS.Transform` class is used to serialize and deserialize model
 * attributes when they are saved or loaded from an
 * adapter. Subclassing `DS.Transform` is useful for creating custom
 * attributes. All subclasses of `DS.Transform` must implement a
 * `serialize` and a `deserialize` method.
 */
declare class Transform<Deserialized = any, Serialized = any> extends Ember.Object {
  /**
   * When given a deserialized value from a record attribute this
   * method must return the serialized value.
   */
  serialize(
    deserialized: Deserialized,
    options: AttrOptions<Deserialized>
  ): Serialized;
  /**
   * When given a serialize value from a JSON object this method must
   * return the deserialized value for the record attribute.
   */
  deserialize(
    serialized: Serialized,
    options: AttrOptions<Deserialized>
  ): Deserialized;
}


/**
 * The `DS.BooleanTransform` class is used to serialize and deserialize
 * boolean attributes on Ember Data record objects. This transform is
 * used when `boolean` is passed as the type parameter to the
 * [DS.attr](../../data#method_attr) function.
 */
declare class BooleanTransform extends Transform<boolean> {}
/**
 * The `DS.DateTransform` class is used to serialize and deserialize
 * date attributes on Ember Data record objects. This transform is used
 * when `date` is passed as the type parameter to the
 * [DS.attr](../../data#method_attr) function. It uses the [`ISO 8601`](https://en.wikipedia.org/wiki/ISO_8601)
 * standard.
 */
declare class DateTransform extends Transform<Date> {}
/**
 * The `DS.NumberTransform` class is used to serialize and deserialize
 * numeric attributes on Ember Data record objects. This transform is
 * used when `number` is passed as the type parameter to the
 * [DS.attr](../../data#method_attr) function.
 */
declare class NumberTransform extends Transform<number> {}
/**
 * The `DS.StringTransform` class is used to serialize and deserialize
 * string attributes on Ember Data record objects. This transform is
 * used when `string` is passed as the type parameter to the
 * [DS.attr](../../data#method_attr) function.
 */
declare class StringTransform extends Transform<string> {}

export default Transform;
export {
  BooleanTransform,
  DateTransform,
  NumberTransform,
  StringTransform,
};

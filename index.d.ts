// Type definitions for ember-data 5.2
// Project: https://github.com/emberjs/data
// Definitions by: Derek Wickern <https://github.com/dwickern>
//                 Mike North <https://github.com/mike-north>
//                 Chris Krycho <https://github.com/chriskrycho>
//                 James C. Davis <https://github.com/jamescdavis>
//                 Chris Thoburn <https://github.com/runspired>
//                 Peter Wagenet <https://github.com/wagenet>
//                 Krystan HuffMenne <https://github.com/gitKrystan>
//                 Erik Rothoff Andersson <erik@feeder.co>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 4.4

import Store from "./store";
import Model, { attr as modelAttr, hasMany as modelHasMany, belongsTo as modelBelongsTo, Errors, ManyArray, Snapshot } from "./model";
import Adapter, { BuildURLMixin } from "./adapter";
import AdapterError, {
  InvalidError,
  TimeoutError,
  AbortError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ServerError,
} from "./adapter/errors";
import Serializer from "./serializer";
import EmbeddedRecordsMixin from "./serializer/embedded-records-mixin";
import JSONAPIAdapter from "./adapter/json-api";
import RESTAdapter from "./adapter/rest";
import JSONSerializer from "./serializer/json";
import JSONAPISerializer from "./serializer/json-api";
import RESTSerializer from "./serializer/rest";
import Transform from "./transform";
import BooleanTransform from "./transform/boolean";
import DateTransform from "./transform/date";
import NumberTransform from "./transform/number";
import StringTransform from "./transform/string";

export namespace DS {
  const VERSION: string;
}

interface DS {
  Store: Store;
  PromiseArray: PromiseArray;
  PromiseObject: PromiseObject;

  PromiseManyArray: PromiseManyArray;

  Model: Model;
  attr: typeof modelAttr;
  Errors: Errors;

  Snapshot: Snapshot;

  Adapter: Adapter;

  AdapterError: AdapterError;
  InvalidError: InvalidError;
  TimeoutError: TimeoutError;
  AbortError: AbortError;

  UnauthorizedError: UnauthorizedError;
  ForbiddenError: ForbiddenError;
  NotFoundError: NotFoundError;
  ConflictError: ConflictError;
  ServerError: ServerError;

  Serializer: Serializer;

  ManyArray: ManyArray;

  RecordArrayManager: RecordArrayManager;

  RESTAdapter: RESTAdapter;
  BuildURLMixin: BuildURLMixin;

  RESTSerializer: RESTSerializer;
  JSONSerializer: JSONSerializer;

  JSONAPIAdapter: JSONAPIAdapter;
  JSONAPISerializer: JSONAPISerializer;

  Transform: Transform;
  DateTransform: DateTransform;
  StringTransform: StringTransform;
  NumberTransform: NumberTransform;
  BooleanTransform: BooleanTransform;

  EmbeddedRecordsMixin: EmbeddedRecordsMixin;

  belongsTo: typeof modelBelongsTo;
  hasMany: typeof modelHasMany;
}

export default DS;

declare module "@ember/service" {
  interface Registry {
    store: Store;
  }
}

declare module "ember-test-helpers" {
  interface TestContext {
    store: Store;
  }
}

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

import Ember from "ember";
import Evented from "@ember/object/evented";
import ObjectProxy from "@ember/object/proxy";
import PromiseProxyMixin from "@ember/object/promise-proxy-mixin";
import ModelRegistry from "./types/registries/model";
import Model from "./model";
import { JSONAPIError } from "./adapter/json-api";
import Store from "./store";

export namespace DS {
  /**
   * This method normalizes a modelName into the format Ember Data uses
   * internally.
   */
  function normalizeModelName<K extends keyof ModelRegistry>(
    modelName: K
  ): string;
  const VERSION: string;

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

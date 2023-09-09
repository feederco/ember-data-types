import { Handler } from "ember-data/request";

export {
  SnapshotRecordArray,
  Snapshot,
} from "../model";

declare const LegacyNetworkHandler: Handler;

export {
  LegacyNetworkHandler
};

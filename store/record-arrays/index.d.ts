import { JSONAPILinks, JSONAPIPaginationLinks } from "../../serializer/json-api";

// From: https://github.com/emberjs/data/blob/v5.2.0/packages/store/src/-private/record-arrays/identifier-array.ts

export class IdentifierArray<T> extends Array<T> {
  isUpdating: boolean;
  isLoaded: boolean;
  isDestroying: boolean;
  isDestroyed: boolean;

  declare links: JSONAPILinks | JSONAPIPaginationLinks | null;
  declare meta: Record<string, unknown> | null;
  declare modelName?: string;

  destroy(clear: boolean): void;
  get length(): number;

  save(): Promise<IdentifierArray<T>>;
  update(): Promise<IdentifierArray<T>>;
}

export class Collection<T> extends IdentifierArray<T> {}

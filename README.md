# ember-data-types

Project to get uptodate types in DefinitelyTyped for ember-data 5.x.

How to use:

1. Remove all `@types/ember-data` from your `package.json`
2. Add this repo to your `package.json`:
```json
{
  "devDependencies": {
    "ember-data-types": "github:feederco/ember-data-types#master"
  }
}
```
3. Run `npm install`
4. Include the types where you define types. (Normally `types/*.d.ts`).
```ts
import 'ember-data-types';
``

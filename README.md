# ember-data-types

Project to get uptodate types in DefinitelyTyped for ember-data 5.x.

How to use:

1. Remove all `@types/ember-data` from your `package.json`
2. Add this repo to your `package.json`:
```json
{
  "devDependencies": {
    "@types/ember-data": "github:feederco/ember-data-types#master"
  }
}
```
3. Run `npm install`
4. Add to your tsconfig.json
```ts
"paths": {
  // ... your paths
  "ember-data": [
    "node_modules/@types/ember-data/index"
  ],
  "@ember-data/*": [
    "node_modules/@types/ember-data/*"
  ]
}
``

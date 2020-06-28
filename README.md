# bump-siblings

Bump the version of a package in its monorepo siblings

## goal

Publishing with a monorepo tool bumps the version of your package, but will not bump the version of that package in its monorepo siblings' package.json (under `dependencies`).

## usage

`yarn add -D bump-siblings`

Add to your scripts as publish or postpublish:

```json
{
  "scripts": {
    "publish": "bump-siblings"
  }
}
```

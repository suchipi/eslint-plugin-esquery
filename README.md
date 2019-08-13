# eslint-plugin-esquery

This ESLint plugin lets users write simple ESLint rules right in their config by leveraging the power of [ESQuery](https://github.com/estools/esquery), which is a CSS-selector-like library for ASTs.

## Installation

```
npm install --save-dev eslint-plugin-esquery
```

## Usage

Add `"esquery"` to your eslint config's `"plugins"` array, then enable the `"eslint/eslint"` rule:

```json
{
  "plugins": ["esquery"],
  "rules": {
    "esquery/esquery": "error"
  }
}
```

This won't do anything unless you specify a config for the rule, though. Give the rule an object where each key is an ESQuery pattern string, and each value is the message to report when that pattern is matched:

<!-- prettier-ignore -->
```json
{
  "plugins": ["esquery"],
  "rules": {
    "esquery/esquery": ["error", {
      "VariableDeclarator[kind='var']": "Please don't use var.",
      "Identifier[name.length=1]": "Please use a longer identifier name."
    }]
  }
}
```

If you want a mix of errors and warnings, use the two rules `"esquery/esquery-warn"` and `"esquery/esquery-error"` instead:

<!-- prettier-ignore -->
```json
{
  "plugins": ["esquery"],
  "rules": {
    "esquery/esquery-warn": ["warn", {
      "VariableDeclarator[kind='var']": "Please don't use var."
    }],
    "esquery/esquery-error": ["error", {
      "Identifier[name.length=1]": "Please use a longer identifier name."
    }]
  }
}
```

If you want the message to be dynamic, use a function that returns a string as the value, instead of a string. You have to use a JS config (`.eslintrc.js`) instead of a JSON/YAML config to do this.

<!-- prettier-ignore -->
```js
module.exports = {
  "plugins": ["esquery"],
  "rules": {
    "esquery/esquery": ["error", {
      "Identifier[name.length=1]": (node) =>
        `Please use a longer identifier name, instead of '${node.name}'.`
    }]
  }
}
```

## License

MIT

# @yandex-cloud/babel-preset

> ⚠️ Repository moved to @gravity-ui/babel-preset

Babel preset for Yandex Cloud projects

## Installation
```
npm install --save-dev @yandex-cloud/babel-preset
```

## Usage

### Via `.babelrc`

```json5
{
  "presets": [
      "@yandex-cloud/babel-preset",
      {
        "env": {modules: false}, // defaults to {}
        "runtime": {useESModules: true}, // defaults to {}
        "typescript": true, // defaults to false
        "react": {runtime: "automatic"} // defaults to {}
      }
  ]
}
```

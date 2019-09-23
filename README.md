# 🏗Vue DAG Builder

> Data-driven directed acyclic graph (DAG) visual builder for Vue.js

 [![GitHub Actions](https://github.com/aleximb/vue-dag/workflows/run-tests/badge.svg)](https://github.com/aleximb/vue-dag/actions) [![Netlify Status](https://api.netlify.com/api/v1/badges/377debe3-712c-40c8-a4a8-2909fff31db4/deploy-status)](https://app.netlify.com/sites/vue-dag/deploys)
[![npm](https://img.shields.io/npm/v/vue-dag.svg) ![npm](https://img.shields.io/npm/dm/vue-dag.svg)](https://www.npmjs.com/package/vue-dag)
[![vue2](https://img.shields.io/badge/vue-2+-brightgreen.svg)](https://vuejs.org/)
![GitHub](https://img.shields.io/github/license/aleximb/vue-dag.svg)

## Installation

```bash
npm install --save vue-dag
```
or 
```bash
yarn add vue-dag
```

Import and register the component
```js
import VueDag from 'vue-dag';
```

```js
components: {
    VueDag
}
```

Use it in templates
```html
<vue-dag></vue-dag>
```

Full documentation: [https://vue-dag.netlify.com/](https://vue-dag.netlify.com/)



## Project development setup


### Installs dependencies
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Lints and fixes files
```
yarn run lint
```

### Runs unit tests
```
yarn run test:unit
```

### Builds as library
```
yarn run build:library
```

# import-modules-auto

## 项目运行
```
npm install
npm run serve
```

## 项目介绍

在日常引入组件，模块的时候，其实目录格式都差不多，能不能一键引入所有呢？[require.context](https://webpack.docschina.org/guides/dependency-management/#requirecontext) 可以帮助我们实现这个功能。需要 webpack (或在内部使用了 webpack 的 Vue CLI 3+)

传统引入，如果文件有很多，就会很麻烦，而且后期每加一个文件，需要再导入一次

```js
import moduleA from './modules/moduleA.vue'
import moduleB from './modules/moduleB.vue'
import moduleC from './modules/moduleC.vue'


export default {
  components: {
    moduleA,
    moduleB,
    moduleC
  }
}

```

本项目利用`require.context`，写出两个实例

- 自动化导入组件

```vue
// App.vue
<template>
  <div id="app">
    <my-header></my-header>
    <my-main></my-main>
    <my-footer></my-footer>
  </div>
</template>

<script>
// 关键代码
const modulesFiles = require.context('./components', true, /\.vue$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './myHeader.js' => 'myHeader'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
export default {
  name: 'App',
  // 关键代码
  components: modules
}
</script>
```

- vuex 分包使用以及自动导入

```js
// store/modules/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const context = require.context('./modules', true, /\.js$/)

const modules = context.keys().reduce((modules, modulePath) => {
  // set './moduleA.js' => 'moduleA'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = context(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
```


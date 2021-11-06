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

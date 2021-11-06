<template>
  <div id="app">
    <my-header></my-header>
    <my-main></my-main>
    <div>
      countA: {{ countA }}
      <button @click="increaseCountA()">+</button>
    </div>
    <div>
      countB: {{ countB }}
      <button @click="increaseCountB()">+</button>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// 关键代码
const modulesFiles = require.context("./components", true, /\.vue$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './myHeader.js' => 'myHeader'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
export default {
  name: "App",
  // 关键代码
  components: modules,
  computed: {
    ...mapGetters(['countA', 'countB']),
  },
  methods: {
    increaseCountA() {
      this.$store.dispatch('moduleA/increaseCount');
    },
    increaseCountB() {
      this.$store.dispatch('moduleB/increaseCount');
    },
  },
};
</script>

<style>
</style>

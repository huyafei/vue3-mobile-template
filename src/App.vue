<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
  mounted() {},
};
</script>
<style lang="less">
#app {
  height: 100%;
  height: calc(100% - constant(safe-area-inset-top));
  height: calc(100% - env(safe-area-inset-top));
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  overflow: hidden;
}
</style>

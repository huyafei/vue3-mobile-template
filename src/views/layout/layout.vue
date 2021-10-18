<template>
  <div class="layout">
    <div class="main">
      <router-view></router-view>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  //计算属性
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  //keep-alive 组件激活时调用
  activated() {},
  //keep-alive 组件停用时调用。
  deactivated() {},
  //方法
  methods: {},
};
</script>
<style scoped lang="less">
.layout {
  height: 100%;

  .main {
    height: calc(100% - 50px);
  }
}
</style>

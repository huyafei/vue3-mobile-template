<template>
  <div class="main">
    <div class="error">{{ text }}</div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Page401",
  mixins: [],
  components: {},
  setup() {
    let text = ref("抱歉，您没有权限");
    return { text };
  },
};
</script>
<style scoped lang="less"></style>

<template>
  <div class="main">
    <div class="error">{{ text }}</div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Page404",
  setup() {
    let text = ref("哦豁，页面不见了");
    return {
      text,
    };
  },
};
</script>
<style scoped lang="less"></style>

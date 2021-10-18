<template>
  <van-tabbar v-model="active" active-color="#1989fa">
    <template v-for="item in tabbarList" :key="item.path">
      <van-tabbar-item
        :name="item.name"
        :icon="item.icon"
        replace
        :to="item.path"
        >{{ item.text }}</van-tabbar-item>
    </template>
  </van-tabbar>
</template>
<script>
import { ref, reactive } from "vue";
export default {
  name: "Tabbar",
  components: {},
  props: {},
  setup() {
    let active = ref("HomeIndex");
    let tabbarList = reactive([
      {
        text: "首页",
        icon: "home-o",
        path: "/home/index",
        name: "HomeIndex",
      },
      {
        text: "分类",
        icon: "flag-o",
        path: "/classify/index",
        name: "ClassifyIndex",
      },
      {
        text: "购物车",
        icon: "friends-o",
        path: "/cart/index",
        name: "CartIndex",
      },
      {
        text: "我的",
        icon: "user-o",
        path: "/my/index",
        name: "MyIndex",
      },
    ]);
    return { active, tabbarList };
  },

  //计算属性
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getSelectItemBarName();
  },
  //keep-alive 组件激活时调用
  activated() {},
  //keep-alive 组件停用时调用。
  deactivated() {},
  //方法
  methods: {
    getSelectItemBarName() {
      this.active = this.$route.name;
    },
  },
};
</script>
<style scoped lang="less"></style>

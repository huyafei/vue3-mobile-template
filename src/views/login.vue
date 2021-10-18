<template>
  <div class="">
    <van-button type="primary" @click="routerRedirect()">未登录跳转</van-button>
    <van-button type="primary" @click="login()">登录跳转 </van-button>
  </div>
</template>
<script>
import { userLogin } from "../api";
import { toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import cookies from "../utils/cookie";
export default {
  name: "Login",
  components: {},
  props: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { query } = toRefs(route);
    const redirect = query.redirect || "/home";

    const routerRedirect = function () {
      cookies.remove("token");
      router.replace(redirect);
    };
    const login = function () {
      let millisecond = new Date().getTime();
      let expiresTime = new Date(millisecond + 7000 * 1000);
      userLogin().then((res) => {
        cookies.set("token", res.data.result.token, expiresTime);
        router.replace(redirect);
      });
    };
    return {
      routerRedirect,
      login,
    };
  },
};
</script>
<style scoped lang="less">
.wz {
  font-size: 16px;
  color: @cl-blue;
}
</style>

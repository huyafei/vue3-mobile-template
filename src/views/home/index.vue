<template>
  <div class="">
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button type="primary" @click="getUserInfo">获取用户信息</van-button>
    <br />
    <div id="echars"></div>
    <p>
      君子知夫不全不粹之不足以为美也，故诵数以贯之，思索以通之，为其人以处之，除其害者以持养之。使目非是无欲见也，使耳非是无欲闻也，使口非是无欲言也，使心非是无欲虑也。及至其致好之也，目好之五色，耳好之五声，口好之五味，心利之有天下。是故权利不能倾也，群众不能移也，天下不能荡也。生乎由是，死乎由是，夫是之谓德操。德操然后能定，能定然后能应。能定能应，夫是之谓成人。天见其明，地见其光，君子贵其全也。
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { getUserInfoApi } from "../../api";
import { reactive, computed, onMounted } from "vue";
import * as echarts from "echarts";
export default {
  name: "HomeIndex",
  components: {},
  setup() {
    const store = useStore();
    let echartsOptions = reactive({
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
        },
      ],
    });
    const initEcharts = function () {
      let myChart = echarts.init(document.getElementById("echars"));
      myChart.setOption(echartsOptions, true);
    };
    const getUserInfo = function () {
      getUserInfoApi().then((res) => {
        console.log(res);
      });
    };
    onMounted(() => {
      initEcharts();
    });
    return {
      echartsOptions,
      initEcharts,
      getUserInfo,
      userInfo: computed(() => store.state.user.userInfo),
      userInfoGetter: computed(() => store.getters.user.userInfo),
      // 使用 mutation
      setUserInfo: () => store.commit("user/SET_USERINFO"),
      // 使用 action
      asyncGetUserInfo: () => store.dispatch("user/getUserInfo"),
    };
  },
};
</script>
<style scoped lang="less">
#echars {
  height: 300px;
}
p {
  color: @cl-blue;
  .ellipsis(2);
}
</style>

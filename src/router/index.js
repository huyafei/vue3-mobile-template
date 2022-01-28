import { createRouter, createWebHashHistory } from "vue-router";
import cookies from "../utils/cookie";
import main from "./main";
import other from "./other";

const routes = [...other, ...main];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  if (["Login", "Page404", "Page401"].includes(to.name)) {
    next();
  } else {
    if (from.name == null) {
      //刷新页面重新登陆，更新权限
      next({
        name: "Login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      const token = cookies.get("token");
      if (token && token !== "undefined") {
        next();
      } else {
        next({
          name: "Login",
          query: {
            redirect: to.fullPath,
          },
        });
      }
    }
  }
});
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  window.scrollTo(0, 0);
});
export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import cookies from "../utils/cookie";
import main from "./main";
import other from "./other";

const routes = [...other, ...main];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (["Login", "404", "401"].includes(to.name)) {
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

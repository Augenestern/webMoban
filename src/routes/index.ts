import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useMain } from "@/store/home";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/loginone.vue"),
  },
  {
    path: "/main",
    name: "main",
    redirect: "/shouye",
    component: () => import("@/views/main.vue"),
    children: [
      {
        path: "/geren",
        name: "geren",
        component: () => import("@/components/geRen.vue"),
      },
      {
        path: "/shouye",
        name: "shouye",
        component: () => import("@/components/shouYe.vue"),
      },

      {
        path: "/adminbook",
        name: "adminbook",
        component: () => import("@/components/rootCenter/adminBook.vue"),
      },
      {
        path: "/apibook",
        name: "apibook",
        component: () => import("@/components/rootCenter/apiBook.vue"),
      },
      {
        path: "/userbook",
        name: "userbook",
        component: () => import("@/components/rootCenter/userBook.vue"),
      },
      {
        path: "/shebeiLx",
        name: "shebeiLx",
        component: () => import("@/components/setCenter/shebeiLx.vue"),
      },
      {
        path: "/shebeiTable",
        name: "shebeiTable",
        component: () => import("@/components/setCenter/shebeiTable.vue"),
      },
      {
        path: "/dianLu",
        name: "dianLu",
        component: () => import("@/components/dataCenter/dianLu.vue"),
      },
    ]
  },
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")
  if (to.path == "/") {
    next({ path: "/login" });
  }
  if (token) {
    if (to.path == "/login") {
      next({ path: "/"+ useMain().cebianName.split("|")[0] });
    } else {
      next();
    }
  } else {
    if (to.path != "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  }
})
// 3导出路由   然后去 main.ts 注册 router.ts
export default router
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
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
        path: "/shangpinLie",
        name: "shangpinLie",
        component: () => import("@/components/shangpinLie.vue"),
      },
      {
        path: "/shangpinFen",
        name: "shangpinFen",
        component: () => import("@/components/shangpinFen.vue"),
      },
      {
        path: "/changdi",
        name: "changdi",
        component: () => import("@/components/changdi.vue"),
      },
      {
        path: "/dingdan",
        name: "dingdan",
        component: () => import("@/components/dingdan.vue"),
      },
      {
        path: "/caiwu",
        name: "caiwu",
        component: () => import("@/components/caiwu.vue"),
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
  if (to.path === "/") {
    next({ path: "/login" })
  } else {
    next()
  }
})
// 3导出路由   然后去 main.ts 注册 router.ts
export default router
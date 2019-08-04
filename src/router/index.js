import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Layout from "@/layouts/BasicLayout";

Vue.use(Router);

export const constRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: { title: "首页", icon: "dingdan" },
    children: [
      {
        path: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        name: "home",
        meta: {
          title: "Home", // 导航菜单项标题
          icon: "qq" // 导航菜单项图标
        }
      },
      {
        path: "mua",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Mua.vue"),
        name: "mua",
        meta: {
          title: "Mua",
          icon: "dingdan",
          roles: ["admin"]
        }
      }
    ]
  },
  {
    path: "/user",
    redirect: "/user/login",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/Login.vue")
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/Register.vue")
      }
    ]
  }
];

// 权限页面  服务端请求过来的
export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",

    meta: { title: "测试", icon: "dingdan" },
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/About.vue"),
        name: "about",
        meta: {
          title: "About",
          icon: "wode",
          roles: ["editor"]
        }
      },
      {
        path: "bla",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Bla.vue"),
        name: "bla",
        meta: {
          title: "Bla",
          icon: "dingdan",
          roles: ["admin"]
        }
      }
    ]
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes
});

router.beforeEach((to, form, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

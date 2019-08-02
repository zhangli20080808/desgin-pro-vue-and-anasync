import "nprogress/nprogress.css";
import Home from "./views/Home";
import About from "./views/About";
import Vue from "vue";

/*
 * router 实现
 * 1.实现插件  2.url监听变化 3.路由解析配置  4.实现全局组件 router-link router-view
 * */

//如何让他成为一个插件呢 实现一个install方法
class VueRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};
    //路由响应式 和react路由的区别 vue-router和vue有一个强绑定关系 强依赖 只能用于vue中
    this.app = new Vue({
      data: {
        current: "/"
      }
    });
  }

  init() {
    this.bindEvents(); //url监听变化
    this.createRouteMap(this.$options); //路由解析配置
    this.initComponent(); //实现两个组件
  }

  bindEvents() {
    //  load hash变化
    window.addEventListener("load", this.onHashChange.bind(this));
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || "/";
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    });
  }
  initComponent() {
    //  全局注册组件 Vue  <router-link to=''>fff</router-link>
    Vue.component("router-link", {
      props: { to: String },
      render(h) {
        console.log("22");
        // h(tag,data,children)  this.$slots.default -> fff
        return h("a", { attrs: { href: "#" + this.to } }, [
          this.$slots.default
        ]);
      }
    });
    //router-view
    Vue.component("router-view", {
      //this 当前router的实例
      render: h => {
        console.log("111");
        console.log(this.routeMap[this.app.current]);
        const comp = this.routeMap[this.app.current];
        return h(comp);
      }
    });
  }
}

VueRouter.install = function(Vue) {
  Vue.mixin({
    beforeCreate() {
      //this 是vue实例  这个option就拿出了我们 main.js里面的值
      if (this.$options.router) {
        //仅在根组件执行一次 以后自组件在创建实例的时候 都有$router 这就是为什么我们可以在每个组件使用 重定向 导航
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  });
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home
    },

    {
      path: "/about",
      component: About
    }
  ]
});

// router.beforeEach((to, form, next) => {
//   NProgress.start();
//   next();
// });
//
// router.afterEach(() => {
//   NProgress.done();
// });

export default router;

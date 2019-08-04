import Vue from "vue";
import Vuex from "vuex";
import permission from "./modules/permission";
import user from "./modules/user";
import test from "./modules/test";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { permission, user, test },
  // 全局定义getters便于访问
  getters: {
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
    score: state => state.test.count
  }
});

export default store;

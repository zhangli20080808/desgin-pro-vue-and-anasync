import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/*
 * 原理解析  借助vue本身的数据响应式机制使state响应化，从而使state变化立刻相应在依赖的视图中
 * 初始化  store声名 install实现 kvuex.js vuex也是一个插件
 * 实现四个东西 state mutations getters actions
 * 数据响应式
 * */

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increase(state, n = 1) {
      state.count += n;
    }
  },
  //复杂业务逻辑 类似于container
  actions: {
    increaseAsync({ commit }) {
      setTimeout(() => {
        commit("increase", 3);
      });
    }
  },
  getters: {
    num(state) {
      return `共扔出${state.count}颗`;
    }
  }
});

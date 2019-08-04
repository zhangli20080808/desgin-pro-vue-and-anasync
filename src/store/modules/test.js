const state = { count: 0 };
const mutations = {
  increment(state, n = 1) {
    state.count += n;
  }
};
const actions = {
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit("increment", 2);
    }, 1000);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

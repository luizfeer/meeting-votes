import Vue from 'vue';
import Vuex from 'vuex';
import createMultiTabState from 'vuex-multi-tab-state';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alerts: [],
    candidatesStore: [],
    quorum: 0,
    widthMonitor: 100,
    reverse: 1,
    streaming: false,
    bgColor: null,
  },
  mutations: {
    removeAlert(state) {
      state.alerts.shift();
    },
    setAlert(state, value) {
      state.alerts.push(value);
    },
    addCandite(state, candidates) {
      state.candidatesStore.push(candidates);
    },
    removeCandite(state, index) {
      state.candidatesStore.splice(index, 1);
    },
    saveEditedCandidate(state, index, dataCandidate) {
      state.candidatesStore[index] = dataCandidate;
    },
    setQuorum(state, payload) {
      state.quorum = payload;
    },
    setWidthMonitor(state, payload) {
      state.widthMonitor = payload;
    },
    setStreaming(state, payload) {
      state.streaming = payload;
    },
    changeOrder(state, val) {
      state.reverse = val ? 1 : -1;
    },
    setBgColor(state, val) {
      state.bgColor = val;
    },

  },
  actions: {
    alert({ commit }, msg) {
      commit('setAlert', msg);
      setTimeout(() => { commit('removeAlert'); }, 4500);
    },
  },
  modules: {
  },
  plugins: [
    createMultiTabState({
      statesPaths: ['candidatesStore', 'quorum', 'widthMonitor', 'reverse', 'streaming', 'bgColor'],
    }),
  ],
});

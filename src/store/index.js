import { createStore } from 'vuex'

export default createStore({
  state: {
    loginId:"1",
    loginPassword:"6414336",
    loginName:"yebin"
  },
  mutations: {
    change(state,str){
      state.loginName=str;
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({
  state:{
    userInfo:{}
  },
  mutations:{
    getUserInfo(state,data){
      state.userInfo = data
    }
  }
})
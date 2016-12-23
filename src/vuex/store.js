/**
 * Created by PetitKero on 30/9/2016.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

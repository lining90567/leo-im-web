import Vue from "vue"
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  avatarUrl: '',
  imClient: null,
  currentChannelId: ''
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
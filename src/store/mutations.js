import * as types from './mutation-types'

const mutations = {
  [types.SET_AVATAR_URL]: (state, data) => {
    state.avatarUrl = data
  },  
  [types.SET_IM_CLIENT]: (state, data) => {
    state.imClient = data
  },
  [types.SET_CURRENT_CHANNEL_ID]: (state, data) => {
    state.currentChannelId = data
  }
}

export default mutations
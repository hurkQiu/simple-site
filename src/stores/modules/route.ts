import type { Module } from 'vuex'

export interface RouterState {
  isUnMounted: boolean
  isLogin: boolean
}

const routeModule: Module<RouterState, any> = {
  state: {
    isUnMounted: false,
    isLogin: false
  },
  mutations: {
    routeChange(state: RouterState) {
      state.isUnMounted = !state.isUnMounted
    }
  }
}

export default routeModule

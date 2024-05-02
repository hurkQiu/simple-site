import type { Module } from 'vuex'

export interface NotifyState {
  isNotify: boolean
  title: string
  message: string
}

const notifyModule: Module<NotifyState, any> = {
  state: {
    isNotify: false,
    title: '',
    message: ''
  },
  mutations: {
    setNotify(state: NotifyState, newState: NotifyState) {
      state.isNotify = newState.isNotify
      state.title = newState.title
      state.message = newState.message
    }
  }
}

export default notifyModule

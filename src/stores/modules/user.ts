import type { Module } from 'vuex'

export interface User {
  userId: number
  token: string
  dateTime?: string
}

const userModule: Module<User, any> = {
  state: {
    userId: -1,
    token: ''
  },
  getters: {
    userId: (state: User) => state.userId,
    token: (state: User) => state.token
  },
  mutations: {
    setUser: (state: User, user: User) => {
      state.token = user.token
      state.userId = user.userId
      state.dateTime = user.dateTime
    },
    resetUser: (state: User) => {
      state.userId = -1
      state.token = ''
    }
  }
}

export default userModule

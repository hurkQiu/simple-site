import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface Item {
  title: string
  quantity: number
  price: number
}
export enum MutationsType {
  ADD_ITEM = 'addItem',
  SET_QUANTITY = 'setQuantity'
}

export const key: InjectionKey<Store<Item>> = Symbol()

export const store = createStore<Item[]>({
  state: [],
  mutations: {
    addItem(state, newItem: Item) {
      const index = state.findIndex((item) => item.title === newItem.title)
      if (index >= 0) state[index].quantity += newItem.quantity
      else state.push(newItem)
    },
    setQuantity(state, currentItem: Item) {
      const index = state.findIndex((item) => item.title === currentItem.title)
      if (currentItem.quantity === 0) state.splice(index, 1)
      else state[index].quantity = currentItem.quantity
    }
  }
})

export function useStore() {
  return baseUseStore(key)
}

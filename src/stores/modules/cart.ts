import type { Module } from 'vuex'
import type { Product } from './product'

export interface Cart {
  cartId: string
  products: string
  userId: number
  price: number
  date: Date
}

const cartModule: Module<Cart, any> = {
  state: (): Cart => ({
    cartId: '',
    products: '',
    userId: -1,
    price: 0,
    date: new Date()
  }),
  getters: {
    cartId: (state: Cart) => state.cartId,
    products: (state: Cart) => state.products,
    cartUserId: (state: Cart) => state.userId,
    price: (state: Cart) => state.price
  },
  mutations: {
    setCart: (state: Cart, newCart: Cart) => (state = newCart),
    addItem(state, newItem: Product) {
      if (state.products.length > 0) {
        let products = JSON.parse(state.products)
        const index = products.findIndex((item: any) => item.name === newItem.name)
        if (index >= 0) {
          products[index].quantity += newItem.quantity
          state.products = JSON.stringify(products)
        } else {
          products = state.products.slice(0, state.products.length - 1)
          products += ',' + JSON.stringify(newItem) + ']'
          state.products = products
        }
      } else {
        state.products = '[' + JSON.stringify(newItem) + ']'
      }
      const localData = state.products
      localStorage.setItem('products', localData)
    },
    setQuantity(state, currentItem: Product) {
      const products = JSON.parse(state.products)
      const index = products.findIndex((item: any) => item.name === currentItem.name)
      if (currentItem.quantity === 0) products.splice(index, 1)
      else products[index].quantity = currentItem.quantity
      state.products = products
    },
    resetCart(state) {
      state.products = ''
      state.price = 0
    },
    setLocalProducts(state, products: string) {
      if (products && products.length > 0) {
        state.products = products
      }
    }
  }
}

export default cartModule

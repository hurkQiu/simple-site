import type { Module } from 'vuex'

export interface Product {
  id: number
  name: string
  quantity: number
  price: number
  imgSrc: string
}

const productModule: Module<Product[], any> = {
  state: [],
  mutations: {
    // API 回傳資料
    setProducts: (state: Product[], products: Product[]) => (state = products),
    addItem(state, newProduct: Product) {
      const index = state.findIndex((product) => product.name === newProduct.name)
      if (index >= 0) state[index].quantity += newProduct.quantity
      else state.push(newProduct)
    },
    setQuantity(state, currentItem: Product) {
      const index = state.findIndex((product) => product.name === currentItem.name)
      if (currentItem.quantity === 0) state.splice(index, 1)
      else state[index].quantity = currentItem.quantity
    }
  }
}

export default productModule

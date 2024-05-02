// import { createStore } from 'vuex'
// import userModule from './modules/user'
// import productModule from './modules/product'

// export enum StoreCommit {
//   SETUSERS = 'setUsers',
//   SETPRODUCTS = 'setProducts',
//   ADDITEM = 'addItem',
//   SETQUANTITY = 'setQuantity'
// }

// export default createStore({
//   modules: {
//     user: userModule,
//     product: productModule
//   }
// })

import { type InjectionKey } from 'vue'
import { Store, createStore } from 'vuex'
// import productModule, { type Product } from './modules/product'
import userModule, { type User } from './modules/user'
import cartModule, { type Cart } from './modules/cart'
import routeModule, { type RouterState } from './modules/route'
import type { NotifyState } from './modules/notify'
import notifyModule from './modules/notify'
export enum StoreCommit {
  SET_USER = 'setUser',
  SET_PRODUCTS = 'setProducts',
  ADD_ITEM = 'addItem',
  SET_QUANTITY = 'setQuantity',
  SET_CART = 'setCart',
  RESET_USER = 'resetUser',
  SET_IS_SHOW_LOGIN = 'setIsShowLogin',
  RESET_CART = 'resetCart',
  SET_NOTIFY = 'setNotify',
  SET_LOCAL_PRODUCTS = 'setLocalProducts'
}

// Define injection key
export const key: InjectionKey<Store<State>> = Symbol()
// Define root state type
export interface State {
  userModule: User
  // productModule: Product
  cartModule: Cart
  routeModule: RouterState
  notifyModule: NotifyState
}
export const store = createStore<State>({
  modules: {
    userModule,
    // productModule
    cartModule,
    routeModule,
    notifyModule
  }
})

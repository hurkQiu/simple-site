export interface UserReq {
  account: string
  password: string
}
export interface UserToken {
  userId: number
  token: string
}
export interface UserInfo {
  userId: string
  name?: string
}
export interface Product {
  id: number
  name: string
  price: number
  type: string
  img_Src: string
}
export interface CartProduct {
  id: number
  productId: number
  name: string
  quantity: number
  price: number
}
export interface ShoppingCart {
  cartId?: number
  products: string
  userId: number
  price: number
  date: Date
  status?: string
}
export interface CurrentCart {
  userId: number
  products: string
}

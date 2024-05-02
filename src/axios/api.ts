import axios from 'axios'
import type { CurrentCart, ShoppingCart, UserReq, UserToken } from '@/axios/Model/CommonModel'

const http = axios.create({
  // 引入 .env 設定的 API url
  baseURL: 'https://ethical-seriously-louse.ngrok-free.app/api',
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
})
export class API {
  //------------------- constructor -------------------
  private static instance: API
  public static getInstance(): API {
    if (!API.instance) {
      API.instance = new API()
    }
    return API.instance
  }
  //------------------- get -------------------
  // 商品資料
  public async getProducts() {
    const url = '/products'
    let resData: any
    await http.get(url).then((result) => {
      resData = result.data
    })
    return resData
  }

  // 商品分類
  public async getProductType() {
    const url = 'type-list'
    let resData: any
    await http.get(url).then((result) => {
      resData = result.data
    })
    return resData
  }

  // 取得特定商品資料
  public async getProductById(id: number) {
    const url = `/product${id}`
    let resData: any
    await http.get(url).then((result) => {
      resData = result.data
    })
    return resData
  }
  // ------------------- post -------------------
  // 註冊用戶
  public async registerUser(info: UserReq) {
    const url = `/register`
    let resData: any
    await http
      .post(url, info)
      .then((result) => {
        resData = result
      })
      .catch((error) => {
        resData = error.response
      })
    return resData
  }

  // 登入
  public async login(info: UserReq) {
    const url = `/login`
    let resData: any
    await http
      .post(url, info)
      .then((result) => {
        resData = result
      })
      .catch((error) => {
        if (error !== undefined) resData = error.response
      })

    return resData
  }

  //登出
  public async logout(info: UserToken) {
    const url = `/logout`
    let resData: any
    await http
      .post(url, info)
      .then((result) => {
        resData = result
      })
      .catch((error) => {
        if (error !== undefined) resData = error.response
      })

    return resData
  }

  // 新增一筆訂單
  public async checkoutOrder(cart: ShoppingCart) {
    const url = '/checkout-order'
    let resData: any
    await http.post(url, cart).then((result) => {
      resData = result.data
    })
    return resData
  }

  // 購物車新增商品
  public async addProductsToCart(cart: CurrentCart) {
    const url = '/add-products-to-cart'
    let resData: any
    await http.post(url, cart).then((result) => {
      resData = result.data
    })
    return resData
  }

  // 取得購買紀錄
  public async getRecords(userId: number) {
    const url = `/records?userId=${userId}`
    let resData: any
    await http.post(url).then((result) => {
      resData = result.data
    })
    return resData
  }

  // 取得用戶購物車資料
  public async getCart(userId: number) {
    const url = `/cart?userId=${userId}`
    let resData: any
    await http.get(url).then((result) => {
      resData = result.data
    })
    return resData
  }

  // 透過token取得用戶資料
  public async getUserInfo(token: string) {
    const url = `/check-token?token=${token}`
    let resData: any
    await http
      .post(url)
      .then((result) => {
        resData = result.data
      })
      .catch((error) => {
        if (error) localStorage.removeItem('token')
      })
    return resData
  }
}

// 攔截請求
http.interceptors.request.use(
  (config) => {
    // 登入成功後從 Local Storage 取得 token
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 攔截回應
http.interceptors.response.use(
  (res) => {
    switch (res.status) {
      case 200:
        return Promise.resolve(res)
      default:
        console.log('error')
        return Promise.reject(res)
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.error(error.response)
          return Promise.reject(error)
        case 401:
          console.error(error)
          return Promise.reject(error)
        default:
          console.error('攔截錯誤請求', error.response.status)
          return Promise.reject(error)
      }
    }
  }
)

export default http

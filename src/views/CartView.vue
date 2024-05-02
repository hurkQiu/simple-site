<template>
  <div class="cart">
    <div v-if="list.length > 0" class="content">
      <div class="title">shopping cart</div>
      <div class="item" v-for="(item, index2) in list" :key="index2">
        <img :src="item.imgSrc" style="max-height: 150px" />
        <div>{{ item.name }}</div>
        <QuantityCalculate
          :name="item.name"
          :price="item.price"
          :id="item.id"
          :img-src="item.imgSrc"
          :noCart="true"
          :size="32"
          :default-quantity="item.quantity"
        ></QuantityCalculate>
      </div>
      <button class="float-btn" @click="checkout">checkout</button>
    </div>
    <div class="empty" v-else>
      <ShoppingCartOutlined />
      There are no items in the shopping cart
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ShoppingCartOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { StoreCommit, key } from '@/stores'
import { API } from '@/axios/api'
import type { Product } from '@/stores/modules/product'
import QuantityCalculate from '@/components/QuantityCalculate.vue'
import type { ShoppingCart } from '@/axios/Model/CommonModel'
const list = ref<Product[]>([])
const store = useStore(key)
const visible = ref(false)
async function checkout() {
  const userId = store.state.userModule.userId
  if (userId > 0) {
    const products = JSON.stringify(list.value)
    let price = 0
    for (let index = 0; index < list.value.length; index++) {
      price += list.value[index].price * list.value[index].quantity
    }
    const cart: ShoppingCart = {
      products,
      userId: userId,
      price,
      date: new Date(),
      status: ''
    }
    const res = await API.getInstance().checkoutOrder(cart)
    if (res === 'success') {
      list.value = []
      store.commit(StoreCommit.RESET_CART)
      store.commit(StoreCommit.SET_NOTIFY, {
        isNotify: true,
        title: 'message',
        message: 'add new order successful'
      })
    } else
      store.commit(StoreCommit.SET_NOTIFY, {
        isNotify: true,
        title: 'Message',
        message: 'An error occurred, please try again later'
      })
    visible.value = true
  } else {
    store.state.routeModule.isLogin = true
  }
}

onMounted(async () => {
  store.state.routeModule.isUnMounted = false
  const userId = store.state.userModule.userId
  if (userId > 0) {
    const data = await API.getInstance().getCart(userId)
    if (data.products && data.products.length > 0) list.value = data.products
    else if (store.state.cartModule.products.length > 0)
      list.value = JSON.parse(store.state.cartModule.products)
  } else {
    if (store.state.cartModule.products.length > 0)
      list.value = JSON.parse(store.state.cartModule.products)
  }
})
</script>
<style scoped>
.cart {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 95vh;
  justify-content: center;
  padding-top: 5%;
}
.content {
  display: flex;
  width: 90vw;
}
.empty {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 32px;
}
.title {
  display: flex;
  justify-content: center;
  font-size: 32px;
}
.item {
  display: flex;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: space-between;
}
.float-btn {
  display: flex;
  position: fixed;
  width: 80%;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 255, 0.5);
  border-radius: 5px;
  font-size: 24px;
  color: #ffffff;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 255, 1);
  }
}
</style>

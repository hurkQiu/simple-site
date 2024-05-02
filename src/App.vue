<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import TopMenu from '@/components/TopMenu.vue'
import { watch, ref, onMounted } from 'vue'
import LoginComponent from '@/components/LoginComponent.vue'
import { Spin, notification } from 'ant-design-vue'
import { useStore } from 'vuex'
import { StoreCommit, key } from './stores'
import { API } from './axios/api'
const show = ref(false)
const isLoading = ref(false)
const router = useRouter()
const store = useStore(key)
function openNotification(title: string, description: string) {
  notification.open({
    message: title,
    description,
    duration: 5
  })
}

router.beforeEach(() => {
  store.state.routeModule.isUnMounted = true
})
watch(store.state.routeModule, (oldValue, newValue) => {
  isLoading.value = newValue.isUnMounted
  show.value = newValue.isLogin
})
watch(store.state.notifyModule, (oldValue, newValue) => {
  if (newValue.isNotify === true) {
    openNotification(newValue.title, newValue.message)
  }
})
onMounted(async () => {
  const localToken = localStorage.getItem('token')
  if (localToken) {
    const res = await API.getInstance().getUserInfo(localToken)
    if (res > 0) {
      const user = { userId: res, token: localToken }
      store.commit(StoreCommit.SET_USER, user)
      const data = await API.getInstance().getCart(res)
      if (data.products) store.commit(StoreCommit.SET_PRODUCTS, data.products)
    }
  }
  store.commit(StoreCommit.SET_LOCAL_PRODUCTS, localStorage.getItem('products'))
})
</script>

<template>
  <header>
    <TopMenu></TopMenu>
  </header>
  <div class="mask" v-show="isLoading">
    <Spin tip="Loading..." size="large"> </Spin>
  </div>
  <div class="container">
    <RouterView />
    <LoginComponent :open="show" @close="show = false" />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  position: sticky;
  top: 0;
  z-index: 100;
  max-width: 100%;
}
.container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.mask {
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

@media (min-width: 1024px) {
  header {
    display: block;
    place-items: center;
  }
}
</style>

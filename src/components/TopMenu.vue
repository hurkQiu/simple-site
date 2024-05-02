<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { Dropdown, Menu, Button, Badge } from 'ant-design-vue'
import { ShoppingCartOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { h, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { StoreCommit, key } from '@/stores'
import type { Product } from '@/stores/modules/product'
import { API } from '@/axios/api'

const current = ref<string[]>(['Home'])
const store = useStore(key)
const cart = ref<Product[]>([])
const router = useRouter()
const user = reactive(store.state.userModule)
const paddingInline = ref(window.innerWidth <= 450 ? 5 : 16)
const homeTitle = ref(window.innerWidth <= 450 ? '' : 'Coffee Site')
function itemSubscribe() {
  store.subscribe((mutation, state) => {
    if (
      mutation.type === StoreCommit.ADD_ITEM ||
      mutation.type === StoreCommit.SET_LOCAL_PRODUCTS
    ) {
      if (state.cartModule.products.length > 0) {
        const products = JSON.parse(state.cartModule.products)
        cart.value = products
      }
    }
    if (mutation.type === StoreCommit.RESET_CART) {
      cart.value = []
    }
  })
}
function handleDropdownClick(event: any) {
  event.stopPropagation()
}
function itemQuantityChange(item: Product, quantity: number) {
  const newItem = item
  newItem.quantity = quantity
  store.commit(StoreCommit.SET_QUANTITY, newItem)
}
function selectKey(info: any) {
  const { key } = info
  if (key && key !== '') current.value = [key.toString()]
}
async function checkOut(event: any) {
  if (store.state.cartModule.products.length > 0) {
    const userId = store.state.userModule.userId
    const products = store.state.cartModule.products
    const res = await API.getInstance().addProductsToCart({ userId, products })
    if (res !== 'success') {
      console.log('update product error')
    }
  }
  event.stopPropagation()
  router.push('cart')
}
function login(event: any) {
  event.stopPropagation()
  store.state.routeModule.isLogin = true
}
async function logOut(event: any) {
  event.stopPropagation()
  const res = await API.getInstance().logout({
    userId: store.state.userModule.userId,
    token: store.state.userModule.token
  })
  if (res.status === 200) {
    localStorage.clear()
    store.commit(StoreCommit.RESET_USER)
    store.commit(StoreCommit.SET_NOTIFY, {
      isNotify: true,
      title: 'Message',
      message: 'logout successful'
    })
    cart.value = []
    router.push('/')
  } else
    store.commit(StoreCommit.SET_NOTIFY, {
      isNotify: true,
      title: 'Message',
      message: 'An error occurred, please try again later'
    })
}
function checkRecord(event: any) {
  event.stopPropagation()
  if (store.state.userModule.userId > 0) {
    router.push('record')
  }
}
onMounted(itemSubscribe)
onUnmounted(itemSubscribe)
</script>
<template>
  <div class="banner">Get free delivery on orders over NT$1000</div>
  <nav>
    <Menu
      :selected-keys="current"
      mode="horizontal"
      class="menu"
      trigger-sub-menu-action="click"
      @click="selectKey"
    >
      <Menu.Item
        key="Home"
        :icon="h(HomeOutlined)"
        :style="{ 'padding-inline': `${paddingInline}px` }"
      >
        <RouterLink to="/">{{ homeTitle }}</RouterLink>
      </Menu.Item>
      <div>
        <Menu.Item
          key="Products"
          title="Products"
          :style="{ 'padding-inline': `${paddingInline}px` }"
        >
          <RouterLink to="/products">Products</RouterLink>
        </Menu.Item>
        <Menu.Item key="Course" title="Course" :style="{ 'padding-inline': `${paddingInline}px` }">
          <RouterLink to="/course">Course</RouterLink>
        </Menu.Item>
        <Menu.Item
          key="AboutUs"
          title="About Us"
          :style="{ 'padding-inline': `${paddingInline}px` }"
        >
          <RouterLink to="/about">About Us</RouterLink>
        </Menu.Item>
        <Menu.SubMenu
          :icon="h(ShoppingCartOutlined)"
          class="submenu-icon"
          :style="{ 'padding-inline': `${paddingInline}px` }"
        >
          <template #title>
            <Badge class="badge" :count="cart.length" :offset="['-15%', '-120%']"></Badge>
          </template>
          <Menu.Item v-for="(item, index) in cart" :key="index">
            <div style="display: flex; justify-content: space-between">
              <span style="max-width: 70%; text-overflow: ellipsis; overflow-x: hidden">
                {{ item.name }}
              </span>
              <Dropdown trigger="click" style="padding-left: 25px">
                <Button @click="handleDropdownClick">{{ item.quantity }}</Button>
                <template v-slot:overlay>
                  <Menu>
                    <Menu.Item
                      v-for="i in 11"
                      :key="i - 1"
                      @click="itemQuantityChange(item, i - 1)"
                      >{{ i - 1 }}</Menu.Item
                    >
                  </Menu>
                </template>
              </Dropdown>
            </div>
          </Menu.Item>
          <Menu.Item
            style="background-color: blue"
            @click="checkOut"
            :disabled="store.state.cartModule.products.length <= 0"
          >
            checkout
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          :icon="h(UserOutlined)"
          class="submenu-icon"
          :style="{ 'padding-inline': `${paddingInline}px` }"
        >
          <Menu.Item key="LogOut" v-if="user.userId > 0" disabled>{{
            `user_${user.userId}`
          }}</Menu.Item>
          <Menu.Item key="LogIn" :disabled="user.userId > 0" @click="login">login</Menu.Item>
          <Menu.Item key="LogOut" :disabled="user.userId <= 0" @click="logOut">logout</Menu.Item>
          <Menu.Item key="LogOut" :disabled="user.userId <= 0" @click="checkRecord">
            Historical orders
          </Menu.Item>
        </Menu.SubMenu>
      </div>
    </Menu>
  </nav>
</template>
<style scoped lang="scss">
.banner {
  background-color: #e9967a;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #fff;
}
nav {
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #b0b0b0;
  background-color: #fff;
  ul {
    display: flex;
    gap: 10px;
  }
}
.menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  font-size: 24px;
}
:deep(.submenu-icon) {
  font-size: 24px;
  svg {
    font-size: 24px;
  }
}
.item {
  padding-inline: 5px;
}

@media (max-width: 450px) {
  .menu {
    font-size: 14px;
  }
  nav {
    padding-left: unset;
    padding-right: unset;
    ul {
      gap: unset;
    }
  }
}
@media (max-width: 400px) {
  .menu {
    font-size: 12px;
  }
}
</style>

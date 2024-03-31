<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Dropdown, Menu, Button, Badge } from 'ant-design-vue'
import { ShoppingCartOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { h, onMounted, onUnmounted, ref } from 'vue'
import { MutationsType, store } from '@/stores/store'
import type { Item } from '@/stores/store'
import type { MenuClickEventHandler } from 'ant-design-vue/es/menu/src/interface'
const current = ref<string[]>(['Home'])
const cart = ref<Item[]>([])

const itemSubscribe = () => {
  store.subscribe((_, state) => {
    cart.value = state
  })
}
const handleDropdownClick = (event: any) => {
  event.stopPropagation()
}
const itemQuantityChange = (item: Item, quantity: number) => {
  const newItem = item
  newItem.quantity = quantity
  store.commit(MutationsType.SET_QUANTITY, newItem)
}
const selectKey: MenuClickEventHandler = (info) => {
  const { key } = info
  if (key !== '') current.value = [key.toString()]
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
      <Menu.Item key="Home" :icon="h(HomeOutlined)">
        <RouterLink to="/">Coffee Site</RouterLink>
      </Menu.Item>
      <div>
        <Menu.Item key="Products" title="Products">
          <RouterLink to="/products">Products</RouterLink>
        </Menu.Item>
        <Menu.Item key="Course" title="Course">
          <RouterLink to="/course">Course</RouterLink>
        </Menu.Item>
        <Menu.Item key="AboutUs" title="About Us">
          <RouterLink to="/about">About Us</RouterLink>
        </Menu.Item>
        <Menu.SubMenu :icon="h(ShoppingCartOutlined)" class="submenu-icon">
          <template #title>
            <Badge class="badge" :count="cart.length" :offset="['-15%', '-120%']"></Badge>
          </template>
          <Menu.Item v-for="(item, index) in cart" :key="index">
            <div style="display: flex; justify-content: space-between">
              <span style="max-width: 70%; text-overflow: ellipsis; overflow-x: hidden">
                {{ item.title }}
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
          <Menu.Item style="background-color: blue"> check out </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu :icon="h(UserOutlined)" class="submenu-icon">
          <Menu.Item key="LogIn">Log In</Menu.Item>
          <Menu.Item key="LogOut">Log Out</Menu.Item>
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
</style>

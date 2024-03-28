<template>
  <div class="banner">Get free delivery on orders over NT$1000</div>
  <nav>
    <Menu
      v-model:selected-keys="current"
      mode="horizontal"
      style="display: flex; justify-content: space-between; width: 100%; height: 100%"
    >
      <Menu.Item key="Home" :icon="h(HomeOutlined)">
        <RouterLink to="/">Coffee Site</RouterLink>
      </Menu.Item>
      <div>
        <Menu.Item key="light" title="Products">
          <RouterLink to="/products">Products</RouterLink>
        </Menu.Item>
        <Menu.Item key="Medium" title="Course">
          <RouterLink to="/course">Course</RouterLink>
        </Menu.Item>
        <Menu.Item key="High" title="About Us">
          <RouterLink to="/about">About Us</RouterLink>
        </Menu.Item>
        <Menu.Item :icon="h(ShoppingCartOutlined)"></Menu.Item>
        <Menu.SubMenu :icon="h(UserOutlined)">
          <Menu.Item key="LogIn">Log In</Menu.Item>
          <Menu.Item key="LogOut">Log Out</Menu.Item>
        </Menu.SubMenu>
      </div>
    </Menu>
  </nav>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Menu } from 'ant-design-vue'
import { ShoppingCartOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { h, ref } from 'vue'
const current = ref<string[]>(['Home'])
</script>
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
  :nth-child(1) {
    font-size: 24px;
  }
  :nth-child(2) {
    position: relative;
  }
  ul {
    display: flex;
    gap: 10px;
  }
}
</style>

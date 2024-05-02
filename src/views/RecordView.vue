<template>
  <div class="record">
    <a-list
      item-layout="horizontal"
      :data-source="data"
      style="width: 100%"
      v-if="data.length > 0"
      class="list"
    >
      <template #renderItem="{ item }">
        <a-collapse v-model:activeKey="activeKey">
          <a-collapse-panel :key="item.cartId" :header="`Order#${item.cartId}`">
            <div
              v-for="(product, index) in getProducts(item.products)"
              :key="index"
              class="record-item"
            >
              <a-avatar :src="product.imgSrc" />
              <div>product name: {{ product.name }}</div>
              <div>price: {{ product.price }}</div>
              <div>quantity: {{ product.quantity }}</div>
            </div>
            <div style="display: flex; justify-content: right">
              {{ `total price:${item.price}` }}
            </div>
          </a-collapse-panel>
        </a-collapse>
      </template>
    </a-list>
    <div style="font-size: 32px" v-else>no record</div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { List, Avatar, Collapse, CollapsePanel } from 'ant-design-vue'
import { useStore } from 'vuex'
import { key } from '@/stores'
import { API } from '@/axios/api'
import type { ShoppingCart } from '@/axios/Model/CommonModel'

export default {
  components: {
    'a-list': List,
    'a-avatar': Avatar,
    'a-collapse': Collapse,
    'a-collapse-panel': CollapsePanel
  },
  setup() {
    const data = ref<ShoppingCart[]>([])
    const activeKey = ref(1)
    const store = useStore(key)
    return {
      data,
      store,
      activeKey
    }
  },
  methods: {
    getProducts(data: string) {
      const products = JSON.parse(data)
      return products
    }
  },
  async mounted() {
    this.store.state.routeModule.isUnMounted = false
    const userId = this.store.state.userModule.userId
    if (userId > 0) {
      const res = await API.getInstance().getRecords(Number(userId))
      this.data = res
    }
  }
}
</script>
<style scoped>
.record {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}
.record-item {
  display: grid;
  grid-template-columns: 10% 50% 20% 20%;
  width: 100%;
  height: 100%;
}
</style>

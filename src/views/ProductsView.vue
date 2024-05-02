<script lang="ts">
import { ref } from 'vue'
import { Rate } from 'ant-design-vue'
import QuantityCalculate from '@/components/QuantityCalculate.vue'
import { Pagination } from 'ant-design-vue'
import { API } from '@/axios/api'
import type { Product } from '@/axios/Model/CommonModel'
import { useStore } from 'vuex'
import { key } from '@/stores'
export default {
  setup() {
    const tag = ref(0)
    const currentPage = ref(1)
    const pageSizeArray = ref([1, 3, 5, 10])
    const currentPageSize = ref(10)
    const products = ref<Product[]>([])
    const productTypes = ref<string[]>([])
    const productList = ref<{ type: string; items: Product[] }[]>([])
    const store = useStore(key)
    return {
      tag,
      currentPage,
      pageSize: pageSizeArray,
      currentPageSize,
      productList,
      products,
      productTypes,
      store
    }
  },
  components: {
    ARate: Rate,
    QuantityCalculate,
    APagination: Pagination
  },
  methods: {
    isShowItem(index: number) {
      const start = (this.currentPage - 1) * this.currentPageSize
      const end = this.currentPage * this.currentPageSize
      if (index < end && index >= start) return true
      return false
    },
    changeTag(index: number) {
      this.tag = index
      this.currentPage = 1
      this.currentPageSize = 10
    },
    setProductsData() {
      this.productTypes.forEach((typeData: any) => {
        this.productList.push({ type: typeData.type, items: [] })
      })
      for (let index = 0; index < this.products.length; index++) {
        const flag = this.productList.findIndex(
          (product) => product.type === this.products[index].type
        )
        if (flag >= 0) this.productList[flag].items.push(this.products[index])
      }
    },
    async getProductType() {
      const types = await API.getInstance().getProductType()
      this.productTypes = types
    },
    async getProducts() {
      const products = await API.getInstance().getProducts()
      this.products = products
    }
  },
  async mounted() {
    await this.getProductType()
    await this.getProducts()
    this.setProductsData()
    this.store.state.routeModule.isUnMounted = false
  }
}
</script>
<template>
  <div class="product">
    <div class="side-bar">
      <li
        :class="['side-item', { active: tag === index }]"
        v-for="(item, index) in productList"
        :key="index"
        @click="changeTag(index)"
      >
        {{ item.type }}
      </li>
    </div>
    <div class="content">
      <APagination
        v-model:current="currentPage"
        v-model:pageSize="currentPageSize"
        :pageSizeOptions="['1', '3', '5', '10']"
        show-size-changer
        :total="productList[tag] ? productList[tag].items.length : 0"
        show-less-items
        responsive
        class="pagination"
      />
      <div
        class="item-group"
        v-for="(product, index) in productList"
        :key="index"
        v-show="tag === index"
      >
        <div
          class="item"
          v-for="(item, index2) in product.items"
          :key="index2"
          v-show="isShowItem(index2)"
        >
          <img :src="item.img_Src" />
          <div class="item-description">
            <div class="item-title">{{ item.name }}</div>
            <!-- <div :class="{ discounted: item.discount < 1 }">NT${{ item.price }}</div>
            <div v-show="item.discount < 1">
              NT$: {{ Math.floor(Number(item.price) * item.discount) }}
            </div> -->
            <ARate allow-half disabled :value="4" />
            <div>NT$:{{ item.price }}</div>
            <QuantityCalculate
              :name="item.name"
              :price="item.price"
              :id="item.id"
              :img-src="item.img_Src"
              style="margin: auto"
            ></QuantityCalculate>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.product {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  background: linear-gradient(#f5f5dc42, #cdcda77c);
}
.side-bar {
  display: flex;
  min-width: 200px;
  height: 100%;
  position: relative;
  left: 0;
  flex-direction: column;
  border-right: 1px solid;
  padding-left: 20px;
  padding-top: 50px;
  gap: 10px;
  font-size: 24px;
}
.side-item {
  list-style-type: none;
  border-bottom: 1px solid;
  &:hover {
    cursor: pointer;
    background-color: rgba(176, 176, 176, 0.2);
  }
  &.active {
    background-color: rgba(176, 176, 176, 0.2);
  }
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px;
}
.item-group {
  display: flex;
  width: 100%;
  justify-content: start;
  align-content: start;
  flex-wrap: wrap;
  gap: 40px;
  padding-left: 10%;
}
.item {
  display: flex;
  flex-direction: row;
  width: 340px;
  height: 220px;
  gap: 5px;
  border: 1px solid;
  border-radius: 20px;
  padding: 10px;
  img {
    width: 180px;
    height: 180px;
  }
}
.item-title {
  display: flex;
  max-height: 40%;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-description {
  padding-top: 5px;
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  ul {
    font-size: 16px;
  }
}
.discounted {
  text-decoration: line-through;
}
.pagination {
  display: flex;
  width: 100%;
  position: relative;
  right: 0;
  justify-content: end;
  padding-right: 10%;
  padding-bottom: 1%;
}
</style>

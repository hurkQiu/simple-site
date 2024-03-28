<script lang="ts">
import { ref } from 'vue'
import { Rate } from 'ant-design-vue'
import QuantityCalculate from '@/components/QuantityCalculate.vue'
import { Pagination } from 'ant-design-vue'
export default {
  data() {
    return {
      products: [
        {
          category: 'Coffee Beans',
          items: [
            {
              title: 'EL TRIUNFO / COLOMBIA',
              price: '360',
              discount: 0.94,
              imgSrc: 'https://fuglencoffee.jp/cdn/shop/files/ElTriunfo-01_800x.png?v=1710319192'
            },
            {
              title: 'LOS CEDROS / HONDURAS',
              price: '320',
              discount: 0.95,
              imgSrc: 'https://fuglencoffee.jp/cdn/shop/files/LosCedros2_800x.png?v=1710288537'
            },
            {
              title: 'EL PEDREGAL ESPRESSO / EL SALVADOR',
              price: '520',
              discount: 0.94,
              imgSrc:
                'https://fuglencoffee.jp/cdn/shop/files/ElPedregalesp-01_800x.png?v=1710288194'
            },
            {
              title: 'CABALLERO / HONDURAS',
              price: '260',
              discount: 0.91,
              imgSrc:
                'https://fuglencoffee.jp/cdn/shop/files/ECCaballeroFilter_800x.png?v=1708401517'
            },
            {
              title: 'BULAMBULI / UGANDA',
              price: '270',
              discount: 0.93,
              imgSrc: 'https://fuglencoffee.jp/cdn/shop/files/ECBulambuli_800x.png?v=1708407271'
            },
            {
              title: 'CABALLERO ESPRESSO / HONDURAS',
              price: '520',
              discount: 0.9,
              imgSrc: 'https://fuglencoffee.jp/cdn/shop/files/ECCaballeroEsp_800x.png?v=1708407389'
            }
          ]
        },
        {
          category: 'Coffee utensils',
          items: [
            {
              title: '4 PCS 6.7 Inches Coffee Spoons',
              price: '270',
              discount: 0.75,
              imgSrc:
                'https://images-na.ssl-images-amazon.com/images/I/51Ev1-Oe6cS._AC_UL232_SR232,232_.jpg'
            },
            {
              title: 'WDT Tool Espresso',
              price: '750',
              discount: 1,
              imgSrc:
                'https://images-na.ssl-images-amazon.com/images/I/81AWvs+HtcL._AC_UL232_SR232,232_.jpg'
            },
            {
              title: 'Bean Envy Handheld Milk Frother for Coffee - Electric Hand Blender',
              price: '390',
              discount: 0.77,
              imgSrc:
                'https://images-na.ssl-images-amazon.com/images/I/71awEli5TGL._AC_UL232_SR232,232_.jpg'
            },
            {
              title: '1 Pack Double Spouts Measuring',
              price: '300',
              discount: 0.9,
              imgSrc:
                'https://images-na.ssl-images-amazon.com/images/I/51lKtE2rU-L._AC_UL232_SR232,232_.jpg'
            },
            {
              title: 'Wooden Tablespoon Scoop',
              price: '180',
              discount: 1,
              imgSrc:
                'https://images-na.ssl-images-amazon.com/images/I/51xUW+gV31L._AC_UL232_SR232,232_.jpg'
            }
          ]
        },
        {
          category: 'Drip Bag Coffee',
          items: [
            {
              title: '100Pcs Portable Coffee Filter Paper Bag',
              price: '390',
              discount: 1,
              imgSrc:
                'https://images-na.ssl-images-amazon.com/images/I/61zWM0k-JlL._AC_UL232_SR232,232_.jpg'
            },
            {
              title: '50Pcs Single Serve Disposable Drip Coffee',
              price: '180',
              discount: 1,
              imgSrc:
                'https://images-na.ssl-images-amazon.com/images/I/61hEMkx1N8L._AC_UL232_SR232,232_.jpg'
            },
            {
              title: 'Coffee Filter Paper Bag 100 pieces',
              price: '450',
              discount: 1,
              imgSrc:
                'https://images-na.ssl-images-amazon.com/images/I/51U0KsrvDEL._AC_UL232_SR232,232_.jpg'
            },
            {
              title: '3 Coracoes Portinari Drip Coffee',
              price: '510',
              discount: 1,
              imgSrc:
                'https://m.media-amazon.com/images/S/aplus-media-library-service-media/5b20c9c5-2950-4112-8122-abd815cbeb16.__CR0,0,970,600_PT0_SX970_V1___.png'
            }
          ]
        }
      ]
    }
  },
  setup() {
    const tag = ref(0)
    const currentPage = ref(1)
    const pageSizeArray = ref([1, 3, 5, 10])
    const currentPageSize = ref(10)
    return { tag, currentPage, pageSize: pageSizeArray, currentPageSize }
  },
  components: {
    ARate: Rate,
    Quantity: QuantityCalculate,
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
    }
  }
}
</script>
<template>
  <div class="product">
    <div class="side-bar">
      <li
        :class="['side-item', { active: tag === index }]"
        v-for="(item, index) in products"
        :key="index"
        @click="changeTag(index)"
      >
        {{ item.category }}
      </li>
    </div>
    <div class="content">
      <a-pagination
        v-model:current="currentPage"
        v-model:pageSize="currentPageSize"
        :pageSizeOptions="['1', '3', '5', '10']"
        show-size-changer
        :total="products[tag].items.length"
        show-less-items
        responsive
        class="pagination"
      />
      <div
        class="item-group"
        v-for="(product, index) in products"
        :key="index"
        v-show="tag === index"
      >
        <div
          class="item"
          v-for="(item, index2) in product.items"
          :key="index2"
          v-show="isShowItem(index2)"
        >
          <img :src="item.imgSrc" />
          <div class="item-description">
            <div class="item-title">{{ item.title }}</div>
            <div :class="{ discounted: item.discount < 1 }">NT${{ item.price }}</div>
            <div v-show="item.discount < 1">
              NT$: {{ Math.floor(Number(item.price) * item.discount) }}
            </div>
            <a-rate allow-half disabled :value="4" />
            <quantity></quantity>
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

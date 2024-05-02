<script lang="ts">
import { StoreCommit, key } from '@/stores'
import type { Product } from '@/stores/modules/product'
import { PlusCircleFilled, MinusCircleFilled, ShoppingCartOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  props: ['name', 'price', 'id', 'imgSrc', 'size', 'noCart', 'defaultQuantity'],
  components: {
    APlus: PlusCircleFilled,
    AMinus: MinusCircleFilled,
    AShopping: ShoppingCartOutlined
  },
  setup(props) {
    const quantity = ref(props.defaultQuantity ?? 0)
    const store = useStore(key)
    return { quantity, store }
  },
  methods: {
    calQuantity(index: number) {
      this.quantity += index
      if (this.quantity < 0) this.quantity = 0
    },
    async addItem() {
      if (this.quantity <= 0) return
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const item: Product = {
        id: this.id,
        name: this.name,
        price: this.price,
        quantity: this.quantity,
        imgSrc: this.imgSrc
      }
      this.store.commit(StoreCommit.ADD_ITEM, item)
      this.quantity = 0
    }
  }
}
</script>
<template>
  <div class="quantity" :style="{ fontSize: size ? `${size}px` : '16px' }">
    <a-minus class="btn" @click="calQuantity(-1)"></a-minus>
    <input type="text" disabled style="border: none" :value="quantity" />
    <a-plus class="btn" @click="calQuantity(1)"></a-plus>
    <a-shopping class="shopping-item btn" @click="addItem" v-if="!noCart"></a-shopping>
  </div>
</template>
<style scoped lang="scss">
.quantity {
  display: flex;
  width: fit-content;
  align-items: center;
  input {
    max-width: 70px;
    text-align: center;
    font-weight: bold;
  }
}
.shopping-item {
  padding-left: 10px;
  font-size: 20px;
  cursor: pointer;
}
.btn {
  :hover {
    scale: 1.05;
  }
}
</style>

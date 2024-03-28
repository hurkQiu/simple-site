<script lang="ts">
import { PlusCircleFilled, MinusCircleFilled } from '@ant-design/icons-vue'
import { ref } from 'vue'
export default {
  components: { APlus: PlusCircleFilled, AMinus: MinusCircleFilled },
  setup() {
    const quantity = ref(0)
    return { quantity }
  },
  methods: {
    calQuantity(index: number) {
      this.quantity += index
      if (this.quantity < 0) this.quantity = 0
    }
  }
}
</script>
<template>
  <div class="quantity">
    <a-minus @click="calQuantity(-1)"></a-minus>
    <input type="text" disabled style="border: none" :value="quantity" />
    <a-plus @click="calQuantity(1)"></a-plus>
  </div>
</template>
<style scoped lang="scss">
.quantity {
  display: flex;
  width: fit-content;
  align-items: center;
  margin-top: auto;
  input {
    max-width: 70px;
    text-align: center;
    font-weight: bold;
  }
}
</style>

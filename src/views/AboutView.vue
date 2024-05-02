<script lang="ts">
import { key } from '@/stores'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore(key)
    return { store }
  },
  mounted() {
    this.store.state.routeModule.isUnMounted = false
  }
}
</script>
<template>
  <div class="about">
    <img src="https://www.voguehk.com/media/2021/08/Screenshot-2021-12-15-at-5.13.45-PM.png" />
    <div>
      <span>Coffee Site</span><br />
      <span>location: _______________</span><br />
      <span>Business hours: Mon-Sat 11 am to 5pm</span>
    </div>
  </div>
</template>

<style>
.about {
  min-height: 95vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 40px;
  gap: 40px;
  font-size: 40px;
  background: linear-gradient(#f5f5dc42, #cdcda77c);
}
img {
  max-width: 600px;
  max-height: 420px;
}
</style>

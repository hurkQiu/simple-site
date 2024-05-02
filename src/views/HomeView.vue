<script lang="ts">
import { ref } from 'vue'
import { EnvironmentFilled, PhoneFilled } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { key } from '@/stores'

export default {
  data() {
    return {
      carouselItems: [
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
          imgSrc: 'https://fuglencoffee.jp/cdn/shop/files/ElPedregalesp-01_800x.png?v=1710288194'
        },
        {
          title: 'CABALLERO / HONDURAS',
          price: '260',
          discount: 0.91,
          imgSrc: 'https://fuglencoffee.jp/cdn/shop/files/ECCaballeroFilter_800x.png?v=1708401517'
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
      ],
      category: [
        {
          title: 'Coffee Beans',
          items: ['Light roast', 'Medium roast', 'High roast'],
          imgSrc:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaw6GLBTU7oYaUHsSJaojL-Gyy_NXFMgeCPw&s'
        },
        {
          title: 'Coffee Utensils',
          items: ['Thick paper filter', 'Gooseneck kettle', 'Coffee pot', 'Grinder'],
          imgSrc:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpbGSat0gZ8DnyTqQOCaGY1N0Ay5zGGgM-4A&s'
        },
        {
          title: 'Drip Bag Coffee',
          items: ['Smooth', 'Acidity', 'Sweet'],
          imgSrc:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3iDthhA6wgvGnzKAV5l7L9Ysj-TcNsISLyQ&s'
        }
      ],
      footerItems: [
        { title: 'Products', items: ['Coffee Beans', 'Coffee Utensils', 'Drip Bag Coffee'] },
        { title: 'Sales Channels', items: ['Physical Stores', 'Online Stores'] },
        { title: 'Our Company', items: ['Locations & Hours', 'About Us'] }
      ]
    }
  },
  setup() {
    const carouselIndex = ref(0)
    const timer = ref(0)
    const store = useStore(key)
    const showDes = ref(window.innerWidth <= 450 ? false : true)
    return { carouselIndex, timer, store, showDes }
  },
  methods: {
    setCarouselIndex(index: number) {
      this.carouselIndex = index
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.carouselIndex += 1
      if (this.carouselIndex >= this.carouselItems.length) this.carouselIndex = 0
    }, 5000)
    this.store.state.routeModule.isUnMounted = false
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  components: { EnvironmentFilled, PhoneFilled }
}
</script>

<template>
  <div class="home">
    <div class="carousel">
      <div class="discount" v-if="showDes">
        ON SALE<br />
        NOW!
      </div>
      <div class="carousel-item" v-for="(item, index) in carouselItems" :key="index">
        <img :class="['carousel-img', { active: carouselIndex === index }]" :src="item.imgSrc" />
        <div :class="['description', { active: carouselIndex === index }]" v-if="showDes">
          {{ item.title }}
          <div class="price">{{ `NT$: ${item.price}` }}</div>
          {{ `NT$: ${Math.floor(Number(item.price) * item.discount)}` }}
        </div>
      </div>
      <div class="dot-group">
        <div
          v-for="(_, index) in carouselItems"
          :class="['dot-button', { active: carouselIndex === index }]"
          :key="index"
          @click="setCarouselIndex(index)"
        ></div>
      </div>
    </div>
    <div class="content">
      <div class="category-title">Products</div>
      <div class="shop-category">
        <div class="category-item" v-for="(item, index) in category" :key="index">
          <img :src="item.imgSrc" />
          <div class="title">{{ item.title }}</div>
          <li v-for="(listItem, index2) in item.items" :key="index2">
            <router-link to="/products" style="color: inherit; text-decoration: none">{{
              listItem
            }}</router-link>
          </li>
        </div>
      </div>
      <div class="category-title">Course</div>
      <div class="course">
        <img src="https://www.voguehk.com/media/2021/08/Screenshot-2021-12-15-at-5.13.45-PM.png" />
        <div class="course-description">
          <div class="content-title">Basic Course</div>
          <div>
            Date: Every Wednesday from 2pm to 3pm<br />location:___________________ <br />Price:
            free
          </div>
        </div>
      </div>
      <div class="location-hours">
        <div class="content-title">Location & Hours</div>
        <div><span>location:________________</span><br />Mon-Sat 11 am to 5pm<br /></div>
        <div style="display: flex; gap: 20px">
          <div class="icon-button">
            <EnvironmentFilled />
            <span>location</span>
          </div>
          <div class="icon-button">
            <PhoneFilled />
            <span>contact us</span>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="footer-group" v-for="(item, index) in footerItems" :key="index">
        <div class="footer-title">{{ item.title }}</div>
        <li v-for="(items, index2) in item.items" :key="index2">
          {{ items }}
        </li>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px;
}
.content {
  display: grid;
  gap: 30px;
}
.carousel {
  display: grid;
  position: relative;
  width: 100%;
  height: 280px;
  background-color: #f6cfc2;
}
.carousel-img {
  display: flex;
  position: absolute;
  left: 90%;
  transform: translateX(-90%);
  width: 300px;
  height: 220px;
  top: 5%;
  opacity: 0;
}
.carousel-item {
  display: flex;
  width: 100%;
  height: 100%;
}
.carousel-img.active {
  opacity: 1;
  animation: moveLeftAndRightIn 1s forwards;
}
@keyframes moveLeftAndRightIn {
  0% {
    opacity: 0;
    transform: translateX(-45%);
  }
  100% {
    opacity: 1;
    transform: translateX(-90%);
  }
}
.dot-group {
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 10px;
  right: 12%;
  bottom: 3%;
  transform: translateX(-12%);
}
.dot-button {
  width: 15px;
  height: 15px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 100%;
}
.dot-button.active {
  background-color: rgba(128, 128, 128, 0.5);
}
.discount {
  font-size: 60px;
  color: #ffa500;
  font-weight: bold;
  font-style: italic;
  max-width: 250px;
  max-height: 250px;
  position: absolute;
  left: 5%;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.description {
  display: grid;
  grid-template-rows: 40% 25% 25%;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10%;
  left: 10%;
  width: min(50vw, 600px);
  height: min(20vh, 250px);
  line-height: 1.2;
  opacity: 0;
  font-size: 32px;
  font-weight: bold;
}
.price {
  text-decoration: line-through;
  color: #808080;
  font-style: italic;
}

.description.active {
  animation: textLeftIn 1.5s forwards;
}
@keyframes textLeftIn {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(50%);
  }
}
.category-title {
  display: flex;
  font-size: 40px;
  font-weight: bold;
  color: #808080;
  justify-content: center;
}
.shop-category {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.category-item {
  display: grid;
  flex-direction: column;
  position: relative;
  width: 20%;
  height: min(80vh, 400px);
  color: white;
  border-radius: 50px;
  padding: 10px;
  &:nth-child(1) {
    background: #a52a2a;
  }
  &:nth-child(2) {
    background: #808080;
  }
  &:nth-child(3) {
    background: #ffa500;
  }
  img {
    max-height: 100%;
    justify-self: center;
    border-radius: 50px;
    max-width: 100%;
  }
  li {
    justify-self: left;
    position: relative;
    left: 30%;
    cursor: pointer;
  }
  &:hover,
  :hover {
    scale: 1.05;
  }
}
.title {
  font-size: 24px;
  justify-self: center;
}
.course {
  display: grid;
  position: relative;
  grid-template-columns: 50% 50%;
  justify-content: space-between;
  left: 5%;
  width: 90%;
  border-radius: 50px;
  padding: 50px;
  background: linear-gradient(to right, #fff, #ccc);
  img {
    width: 100%;
    height: 100%;
  }
}
.course-description {
  font-size: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content-title {
  font-size: 32px;
  font-weight: bold;
}
.location-hours {
  display: grid;
  grid-template-rows: 20% 60% 20%;
  position: relative;
  left: 5%;
  width: 90%;
  border-radius: 50px;
  padding: 50px;
  height: 300px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#f5f5dc, #cdcda7);
  gap: 10px;
  font-size: 22px;
}
.icon-button {
  width: fit-content;
  border: 1px solid;
  border-radius: 20px;
  cursor: pointer;
  padding: 5px;
  &:hover {
    scale: 1.05;
  }
}
footer {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  background: #808080;
  width: 100%;
  height: 100%;
  color: #fff;
  padding: 40px;
}
.footer-title {
  font-size: 24px;
  font-weight: bold;
}
.footer-group {
  display: grid;
  gap: 10px;
  li {
    font-size: 16px;
    list-style-type: none;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      scale: 1.05;
    }
  }
}

@media (max-width: 450px) {
  .shop-category {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .category-item {
    width: 85%;
  }
  .course {
    width: 80%;
    grid-template-columns: unset;
    grid-template-rows: 50% 50%;
    img {
      width: 80%;
    }
  }
  footer {
    padding: 10px;
  }
  .footer-title {
    font-size: 16px;
  }
  .footer-group {
    display: grid;
    gap: 5px;
    li {
      font-size: 12px;
    }
  }
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      courses: [
        {
          title: 'Basic Course',
          description: 'Date: Every Wednesday from 2pm to 3pm',
          price: 'free'
        },
        {
          title: 'Advanced course',
          description: 'Date: Please make appointment in advance',
          price: 'NT$:1000'
        }
      ]
    }
  }
}
</script>
<template>
  <div class="course">
    <div class="item" v-for="(course, index) in courses" :key="index">
      <img src="https://www.voguehk.com/media/2021/08/Screenshot-2021-12-15-at-5.13.45-PM.png" />
      <div class="item-description">
        <div class="item-title">{{ course.title }}</div>
        <div>
          {{ course.description }}<br />location:___________________<br />Price: {{ course.price }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 50px;
  gap: 30px;
}
.item {
  display: grid;
  position: relative;
  grid-template-columns: 50% 50%;
  justify-content: space-between;
  height: 40%;
  left: 1%;
  width: 90%;
  border-radius: 50px;
  padding: 50px;
  &:nth-child(1) {
    background: linear-gradient(to right, #fff, #ccc);
  }
  &:nth-child(2) {
    background: linear-gradient(to right, #fff, #ff9500);
  }
  img {
    width: 90%;
    height: 100%;
  }
}
.item-description {
  font-size: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item-title {
  font-size: 32px;
  font-weight: bold;
}
@media (max-width: 600px) {
  .item-title {
    font-size: 24px;
  }
  .item-description {
    font-size: 16px;
  }
}
</style>

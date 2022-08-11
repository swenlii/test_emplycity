<template>
  <div class="logo">
    Swenlii's test task
  </div>
  <main>
    <!-- Таймер -->
    <div class="timer">
      <h2>Timer</h2>
      <div class="info">
        <div class="value">Currency: {{ this.curr }}</div>
        <div class="time-left">Time left: {{ timerLeft }}</div>
      </div>
      <div class="info">
        <button class="button" @click="updateCurr">Update Currency Now</button>
      </div>
    </div>
    <!-- Список продуктов -->
    <div :class="this.$store.state.isCurrUp ? 'products red' : 'products green'">
      <h2>Products</h2>
      <OneGroup :goods="group.goods"
                :title="group.title"
                v-for="group in this.$store.getters.goods()"
                v-bind:key="'group' + group.id"></OneGroup>
    </div>
    <!-- Корзина -->
    <CartComponent></CartComponent>
  </main>
</template>

<script>
import OneGroup from '@/components/OneGroup';
import CartComponent from '@/components/CartComponent';

export default {
  name: 'App',
  components: {
    CartComponent,
    OneGroup
  },
  data() {
    return {
      curr: 40,
      timerLeft: 0,
      currencyTimeout: null
    }
  },
  async mounted() {
    this.updateCurrTimeout() // обновляем валюту
  },
  methods: {
    updateCurrTimeout() { // автоматическое обновление валюты
      if (this.timerLeft === 0) {
        this.timerLeft = 15;
        // Случайное число 20..80
        this.curr = Math.floor(Math.random() * (80 - 20 + 1) + 20);
        // Обновляем все продукты
        // curr: валюта
        // isCurrUp: bool значение, поднялась или опустилась валюта
        this.$store.dispatch('getGoods', {curr: this.curr, isCurrUp: this.curr > this.$store.state.rub});
      } else {
        this.timerLeft--;
      }
      clearTimeout(this.currencyTimeout);
      this.currencyTimeout = setTimeout(this.updateCurrTimeout, 1000);
    },
    updateCurr() { // ручное обновление валюты
      this.timerLeft = 15;
      this.curr = Math.floor(Math.random() * (80 - 20 + 1) + 20);
      this.$store.dispatch('getGoods', {curr: this.curr, isCurrUp: this.curr > this.$store.state.rub});
    }
  }
}
</script>

<style lang="stylus">
blue = #0ad6ff
blue_01 = rgba(10, 214, 255, 0.1)
@import './assets/style/style.styl'

.logo
  font-weight 300
  font-size 82px
  display flex
  justify-content center
  padding 12px
  color #ff0fd7

.timer
  padding 3em
  background #171428
  border-radius 20px
  border 2px solid blue

  h2
    color blue

  .info
    display flex
    justify-content center
    gap 1em
    margin 1em 0

  .value
    font-size 16px

  .time-left
    font-size 16px

  button
    color blue
    background blue_01

    &:hover
      box-shadow 0 0 0 20px blue inset
      color white

// Mobile
@media screen and (max-width: 600px)
  .logo
  .logo
    padding 3px
    font-size 32px

  .pages-leave-active
    top 46px

  .timer
    padding 20px
    border-radius 10px
</style>

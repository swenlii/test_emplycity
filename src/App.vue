<template>
  <div class="logo">
    Swenlii's test task
  </div>
  <main>
    <div class="timer">
      <h2>Timer</h2>
      <div class="info">
        <div class="value">Currency: {{this.curr}}</div>
        <div class="time-left">Time left: {{timerLeft}}</div>
      </div>
      <div class="info"><button @click="updateCurr">Update Currency Now</button></div>
    </div>
    <div class="products">
      <h2>Products</h2>
      <OneGroup :goods="group.goods"
               :title="group.title"
               v-for="group in this.$store.getters.goods()"
               v-bind:key="'group' + group.id"></OneGroup>
    </div>
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
      curr: 20,
      currencyTimeout: null,
      timerLeft: 15,
    }
  },
  async mounted() {
    await this.$store.dispatch('getGoods');
    this.currencyTimeout = setTimeout(this.updateCurrTimeout, 1000);
  },
  methods: {
    updateCurrTimeout() {
      this.timerLeft--;
      if (this.timerLeft === 0) {
        this.timerLeft = 15;
        this.curr = Math.floor(Math.random() * (80 - 20 + 1) + 20);
        this.$store.commit('updateCurrency', {curr: this.curr, isCurrUp: this.curr > this.$store.state.rub_usd});
      }
      clearTimeout(this.currencyTimeout);
      this.currencyTimeout = setTimeout(this.updateCurrTimeout, 1000);
    },
    updateCurr() {
      this.timerLeft = 15;
      this.curr = Math.floor(Math.random() * (80 - 20 + 1) + 20);
      this.$store.commit('updateCurrency', {curr: this.curr, isCurrUp: this.curr > this.$store.state.rub_usd});
      clearTimeout(this.currencyTimeout);
      this.currencyTimeout = setTimeout(this.updateCurrTimeout, 1000);
    }
  },
  computed: {}
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Marck+Script&display=swap');
@import './assets/style/style.styl'

.logo
  font-family 'Marck Script'
  font-weight 400
  font-size 82px
  line-height initial
  background-color gray_1
  display flex
  justify-content center
  padding 12px
  color #363636

.timer
  padding 3em
  background rgba(51, 182, 222, 0.3)
  border-radius 20px
  box-shadow 0 0 0 3px white inset, 0 0 0 6px rgba(51, 182, 222, 0.3)
  color #333
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
    color #333
    background white
    padding 7px 12px
    border-radius 4px
    cursor pointer
    transform scale(1)
    transition: all 0.3s ease-in-out
    border 1px solid white
    &:hover
      box-shadow 0 0 0 20px rgba(51, 182, 222, 0.3) inset
      border 1px solid #333
    &:active
      transform scale(0.9)

.pages-enter-from
  position relative
  transform translateX(100%)
  opacity 0

.pages-enter-to
  transform translateX(0)
  opacity 1

.pages-leave-from
  position absolute
  transform translateX(-20px)
  opacity 1

.pages-leave-to
  position absolute
  opacity 0
  transform translateX(-100%)

.pages-enter-active
  transition all 0.7s ease;

.pages-leave-active
  top 51px
  position absolute
  transition all 0.7s ease;

@media screen and (max-width: 600px)
  .content
    padding: 46px 15px 53px 15px;

  .logo
  .logo
    padding 3px
    font-size 32px

  .pages-leave-active
    top 46px
</style>

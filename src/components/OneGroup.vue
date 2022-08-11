<template>
  <section>
    <h3>{{ title }}</h3>
    <div :class="this.$store.state.isCurrUp ? 'container red' : 'container green'">
      <div v-for="good in goods" v-bind:key="'good' + good.id" class="product">
        <!-- Название -->
        <div class="title">{{ good.title }}</div>
        <!-- Цена -->
        <div class="price">
          <!-- Цена rub -->
          <span class="rub">
           {{ Math.floor(good.price_rub) }}
           <span class="zeros">.{{ (good.price_rub % 1).toFixed(2).substring(2) }} </span>
           <span class="curr">RUB</span>
         </span>
          <!-- Цена usd -->
          <span class="usd">
           {{ Math.floor(good.price) }}
           <span class="zeros">.{{ (good.price % 1).toFixed(2).substring(2) }} </span>
           <span class="curr">USD</span>
         </span>
        </div>
        <!-- Остаток на складе -->
        <div class="stock">Stock: {{ good.count }}</div>
        <!-- Блок для анимирования смены кнопки на счетчик -->
        <transition-group name="good-buttons">
          <!-- Счетчик -->
          <div class="count-in-cart" v-if="this.$store.getters.cartById(good.id)" key="count-in-cart">
            <button class="add" @click="subRest(good.id)">
              <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.75" y="0.25" width="10.5" height="1.5"/>
              </svg>
            </button>
            <input v-model="this.$store.getters.cartById(good.id).cart"
                   type="number"
                   :max="good.count"
                   min="0"
                   @keyup="inputCount($event.target.value, good.count, good.id)">
            <button class="sub"
                    @click="addRest(good.id)"
                    :disabled="this.$store.getters.cartById(good.id).cart === good.count">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25001 5.25009H0.75V6.75009H5.25001V11.25H6.75001V6.75009H11.25V5.25009H6.75001V0.749977H5.25001V5.25009Z"
                      fill="#366E36"/>
              </svg>
            </button>
          </div>
          <!-- Добавить в корзину -->
          <button v-else
                  @click="addToCart(good)"
                  key="good-button"
                  :class="good.count > 0 ? 'add-to-cart button' : 'out-of-stock button'"
                  :disabled="good.count === 0">{{ good.count > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script>
import {cartLogics} from './mixins/cartLogics'

export default {
  name: 'OneGroup',
  props: {
    goods: {
      type: Array
    },
    title: {
      type: String,
      default: 'Title broken'
    }
  },
  mixins: [cartLogics]
}
</script>

<style lang="stylus" scoped>
rose = #FF0A47
rose_01 = rgba(255, 49, 62, 0.1)
rose_02 = rgba(255, 49, 62, 0.2)
green = #0affc6
green_01 = rgba(10, 255, 198, 0.1)
green_02 = rgba(10, 255, 198, 0.2)

.container
  // Когда цена выше предыдущей
  &.red
    .add-to-cart
      background-color rose_01
      color rose

      &:hover
        box-shadow 0 0 0 20px rose inset
        color white

    .rub
      color rose

    .count-in-cart
      button
        background-color rose_01
        color rose

        &.add:hover
          box-shadow 15px 0 5px 0 rose_02 inset

        &.sub:hover
          box-shadow -15px 0 5px 0 rose_02 inset

        svg *
          fill rose

      input
        background-color rose_01
        color rose
  // Когда цена ниже предыдущей
  &.green
    .add-to-cart
      color green
      background-color green_01

      &:hover
        box-shadow 0 0 0 20px green inset
        color white

    .rub
      color green

    .count-in-cart
      button
        background-color green_01
        color green

        &.add:hover
          box-shadow 15px 0 5px 0 green_02 inset

        &.sub:hover
          box-shadow -15px 0 5px 0 green_02 inset

        svg *
          fill green

      input
        background-color green_01
        color green


  .stock
    min-width 75 pxk
    color #acacb7

  .out-of-stock
    background-color gray_2
    color #A1A1A1
    cursor default

/* Эффект при смене кнопки "Add to cart" на счетчик */
.good-buttons-enter-from
  position relative
  transform translateY(-50px)
  opacity 0

.good-buttons-enter-to
  opacity 1
  transform translateY(0)

.good-buttons-leave-from
  position absolute
  transform translateY(0)
  opacity 1

.good-buttons-leave-to
  position absolute
  transform translateY(50px)
  opacity 0

.good-buttons-enter-active
  transition all 0.7s ease;

.good-buttons-leave-active
  position absolute
  right 0
  transition all 0.4s ease;

</style>
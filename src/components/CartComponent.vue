<template>
  <section class="cart">
    <h2>Cart</h2>
    <div class="content" v-if="this.$store.getters.cart().length > 0">
      <div class="product" v-for="product in this.$store.getters.cart()" v-bind:key="'product' + product.id">
        <!-- Название -->
        <div class="title">{{ product.title }}</div>
        <div class="price">
          <!-- Цена rub -->
          <span class="rub">
           {{ Math.floor(product.price_rub) }}
           <span class="zeros">.{{ (product.price_rub % 1).toFixed(2).substring(2) }} </span>
           <span class="curr">RUB</span>
         </span>
          <!-- Цена usd -->
          <span class="usd">
           {{ Math.floor(product.price) }}
           <span class="zeros">.{{ (product.price % 1).toFixed(2).substring(2) }} </span>
           <span class="curr">USD</span>
         </span>
        </div>
        <!-- Счетчик -->
        <div class="count-in-cart" v-if="this.$store.getters.cartById(product.id)" key="count-in-cart">
          <button class="add" @click="subRest(product.id)" :disabled="this.$store.getters.cartById(product.id).cart <= 1">
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.75" y="0.25" width="10.5" height="1.5" fill="#ffa90a"/>
            </svg>
          </button>
          <input v-model="this.$store.getters.cartById(product.id).cart"
                 type="number"
                 :max="product.count"
                 min="0"
                 @keyup="inputCount($event.target.value, product.count, product.id)">
          <button class="sub"
                  @click="addRest(product.id)"
                  :disabled="this.$store.getters.cartById(product.id).cart === product.count">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.25001 5.25009H0.75V6.75009H5.25001V11.25H6.75001V6.75009H11.25V5.25009H6.75001V0.749977H5.25001V5.25009Z"
                    fill="#ffa90a"/>
            </svg>
          </button>
        </div>
        <!-- Удалить из корзины -->
        <button @click="this.$store.commit('removeFromCart', product.id)"
                class="delete-from-cart button">Delete
        </button>
      </div>
      <!-- Итого -->
      <div class="total">
        <h3>Total:</h3>
        <div class="price">
          <!-- Цена rub -->
          <span class="rub">
           {{ Math.floor(totalPriceRub) }}
           <span class="zeros">.{{ ((totalPriceRub) % 1).toFixed(2).substring(2) }} </span>
           <span class="curr">RUB</span>
         </span>
          <!-- Цена usd -->
          <span class="usd">
           {{ Math.floor(totalPriceUsd) }}
           <span class="zeros">.{{ ((totalPriceUsd) % 1).toFixed(2).substring(2) }} </span>
           <span class="curr">USD</span>
         </span>
        </div>

      </div>
    </div>
    <!-- Когда не добавлен товар -->
    <div class="empty-cart" v-else>
      Empty...
    </div>
  </section>
</template>

<script>
import {cartLogics} from './mixins/cartLogics'

export default {
  name: 'CartComponent',
  mixins: [cartLogics],
  computed: {
    // Итоговая цена в рублях
    totalPriceRub() {
      let sum = 0;
      this.$store.state.cart.forEach(el => sum += el.price * el.cart * this.$store.state.rub);
      return sum.toFixed(2)
    },
    // Итоговая цена в долларах
    totalPriceUsd() {
      let sum = 0;
      this.$store.state.cart.forEach(el => sum += el.price * el.cart);
      return sum.toFixed(2)
    }
  }
}
</script>

<style lang="stylus" scoped>
purple = #ffa90a
purple_01 = rgba(255, 169, 10, 0.1)

.cart
  margin-top 4em
  background #171428
  border-radius 20px
  padding 20px 51px
  border 2px solid purple

  .price .rub
  h2
  h3
    color purple

  .count-in-cart
    button
      color purple
      background-color purple_01

      &.add:hover
        box-shadow 15px 0 5px 0 purple_01 inset

      &.sub:hover
        box-shadow -15px 0 5px 0 purple_01 inset

    input
      background-color purple_01
      color purple

  .delete-from-cart
    background-color purple_01
    color purple

    &:hover
      box-shadow 0 0 0 20px purple inset
      color white

  .total
    display flex
    justify-content space-between
    align-items baseline

    .price
      font-size: 18px

  .empty-cart
    display flex
    justify-content center
    padding 2em 4em 4em 4em

// Mobile
@media screen and (max-width: 600px)
  .logo
  .logo
    padding 3px
    font-size 32px

  .cart
    margin-top 1em
    border-radius 10px
    padding 20px
</style>
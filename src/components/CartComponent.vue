<template>
  <section class="cart">
    <h2>Cart</h2>
    <div class="content" v-if="this.$store.getters.cart().length > 0">
      <div class="product" v-for="product in this.$store.getters.cart()" v-bind:key="'product' + product.id">
        <div class="title">{{product.title}}</div>
        <div class="price">
          <!-- Цена rub -->
          <span class="rub">
           {{ Math.floor(product.price * this.$store.state.rub_usd) }}
           <span class="zeros">.{{((product.price * this.$store.state.rub_usd) % 1).toFixed(2).substring(2)}} </span>
           <span class="curr">RUB</span>
         </span>
          <!-- Цена usd -->
          <span class="usd">
           {{ Math.floor(product.price) }}
           <span class="zeros">.{{(product.price % 1).toFixed(2).substring(2)}} </span>
           <span class="curr">USD</span>
         </span>
        </div>
        <div class="count-in-cart" v-if="this.$store.getters.cartById(product.id)" key="count-in-cart">
          <button class="add" @click="subRest(product.id)">
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.75" y="0.25" width="10.5" height="1.5" fill="#333"/>
            </svg>
          </button>
          <input v-model="this.$store.getters.cartById(product.id).cart" type="number" :max="product.count" min="0" @keyup="inputCount($event.target.value, product.count, product.id)">
          <button class="sub"
                  @click="addRest(product.id)"
                  :disabled="this.$store.getters.cartById(product.id).cart === product.count">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.25001 5.25009H0.75V6.75009H5.25001V11.25H6.75001V6.75009H11.25V5.25009H6.75001V0.749977H5.25001V5.25009Z"
                    fill="#333"/>
            </svg>
          </button>
        </div>
        <button @click="this.$store.commit('removeFromCart', product.id)"
                class="delete-from-cart button">Delete</button>
      </div>
      <div class="total">
        <h3>Total:</h3>
        <div class="price">
          <!-- Цена rub -->
          <span class="rub">
           {{ Math.floor(totalPriceRub) }}
           <span class="zeros">.{{((totalPriceRub) % 1).toFixed(2).substring(2)}} </span>
           <span class="curr">RUB</span>
         </span>
          <!-- Цена usd -->
          <span class="usd">
           {{ Math.floor(totalPriceUsd) }}
           <span class="zeros">.{{((totalPriceUsd) % 1).toFixed(2).substring(2)}} </span>
           <span class="curr">USD</span>
         </span>
        </div>

      </div>
    </div>
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
    totalPriceRub() {
      let sum = 0;
      this.$store.state.cart.forEach(el => sum+=el.price * el.cart * this.$store.state.rub_usd);
      return sum.toFixed(2)
    },
    totalPriceUsd() {
      let sum = 0;
      this.$store.state.cart.forEach(el => sum+=el.price * el.cart);
      return sum.toFixed(2)
    }
  }
}
</script>

<style lang="stylus" scoped>

.cart
  margin-top 4em
  background rgba(121, 86, 209, 0.3)
  border-radius 20px
  box-shadow 0 0 0 3px white inset, 0 0 0 6px rgba(121, 86, 209, 0.3)
  padding: 20px 51px;
  position relative

  .content
    color black

  .count-in-cart
    button
      color #333
      background-color white

      &.add:hover
          box-shadow 15px 0 5px 0 rgba(121, 86, 209, 0.1) inset

      &.sub:hover
          box-shadow -15px 0 5px 0 rgba(121, 86, 209, 0.1) inset

    input
      background-color white

  .delete-from-cart
    background-color white
    &:hover
      box-shadow 0 0 0 20px #7956d1 inset
      color white

  .total
    display flex
    justify-content space-between
    align-items baseline

    .price
      .rub
        font-size 18px
        .zeros
        .curr
          font-size 12px
      .usd
        font-size 15px
        .zeros
          font-size 12px
          position: relative;
          top: -1px;
        .curr
          font-size 10px
          position relative
          top -2px

  .empty-cart
    display flex
    justify-content center
    align-items center
    padding 2em 4em 4em 4em


</style>
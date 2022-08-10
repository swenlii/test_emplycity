export const cartLogics = {
  methods: {
    addToCart(good) {
      this.$store.commit('addToCart', {
        id: good.id,
        title: good.title,
        price: good.price,
        count: good.count,
        cart: 1
      });
      console.log('Add: \n' + good.title.slice(0, 43) + '-' + good.count + '\n-------------------\nCart:\n' + this.$store.getters.cartToString);
    },
    addRest(id) { // нажатие на "+"
      let inCart = this.$store.getters.cartById(id);
      console.log(inCart.cart, ' ', inCart.count, inCart.cart < inCart.count)
      if(inCart && inCart.cart < inCart.count) {
        inCart.cart++;
        console.log(`${inCart.title.slice(0, 43)}: ${inCart.cart}`)
      }
    },
    subRest(id) { // нажатие на "-"
      let inCart = this.$store.getters.cartById(id);

      if (inCart && inCart.cart > 1) { // еще есть что вычитать
        inCart.cart--;
        console.log(`${inCart.title.slice(0, 43)}: ${inCart.cart}`);
      } else if(inCart) { // в корзине один товар - нужно удалять
        this.$store.commit('removeFromCart', id);
        console.log('Remove: \n' + inCart.title.slice(0, 43) + '\n-------------------\nCart:\n' + this.$store.getters.cartToString);
      }
    },
    inputCount(value, max, id) {
      if (value > max) {
        this.$store.getters.cartById(id).cart = max
      }
    }
  }
}
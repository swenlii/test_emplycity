// Все слушатели событий на кнопках добавлении/удалении/счетчика и инпута в товарах
export const cartLogics = {
  methods: {
    // кнопка Add to Cart
    addToCart(good) {
      this.$store.commit('addToCart', {
        id: good.id,
        title: good.title,
        price: good.price,
        price_rub: good.price_rub,
        count: good.count,
        cart: 1
      });
      console.log('Add: ' + good.title.slice(0, 43));
    },
    // нажатие на "+"
    addRest(id) {
      let inCart = this.$store.getters.cartById(id);
      if(inCart && inCart.cart < inCart.count) {
        inCart.cart++;
        console.log(`${inCart.title.slice(0, 43)}: ${inCart.cart}`)
      }
    },
    // нажатие на "-"
    subRest(id) {
      let inCart = this.$store.getters.cartById(id);

      if(inCart && inCart.cart > 1) { // еще есть что вычитать
        inCart.cart--;
        console.log(`${inCart.title.slice(0, 43)}: ${inCart.cart}`);
      } else if(inCart) { // в корзине один товар - нужно удалять
        this.$store.commit('removeFromCart', id);
      }
    },
    // Ввод кол-ва товара
    inputCount(value, max, id) {
      if(value > max) {
        this.$store.getters.cartById(id).cart = max
      }
    }
  }
}
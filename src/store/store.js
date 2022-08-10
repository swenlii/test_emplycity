import { createStore } from 'vuex'

// Здесь хранится корзина
const store = createStore({
  state () {
    return {
      goods: [],
      cart: [],
      rub_usd: 20,
      isCurrUp: false
    }
  },
  mutations: {
    addToCart (state, good) { // добавить новый товар
      state.cart.push(good);
    },
    removeFromCart (state, id) { // удалить товар по id
      let removeIndex = state.cart.map(item => item.id).indexOf(id);
      if (removeIndex >= 0) state.cart.splice(removeIndex, 1);
    },
    setGoods(state, goods) {state.goods = goods},
    updateCurrency(state, {curr, isCurrUp}) {state.rub_usd = curr; state.isCurrUp = isCurrUp}
  },
  actions: {
    async getGoods ({commit}) {
      let names, list;
      await fetch("data.json")
      .then(response => response.json())
      .then(json => { if (json.Success) list = JSON.parse(JSON.stringify(json.Value.Goods))});

      await fetch("names.json")
      .then(response => response.json())
      .then(json => { names = JSON.parse(JSON.stringify(json))});

      let all = [];
      list.forEach((el) => {
        let group = all.find(x => x.id === el.G);
        if (group) {
          group.goods.push({
            id: el.T,
            title: names[el.G].B[el.T].N,
            price: el.C,
            count: el.P
          })
        } else {
          all.push({
            id: el.G,
            title: names[el.G].G,
            goods: [{
              id: el.T,
              title: names[el.G].B[el.T].N,
              price: el.C,
              count: el.P
            }]
          });
        }
      });

      commit('setGoods', all);
    }
  },
  getters: {
    // вернуть товар из корзины по id
    cartById: state => id => state.cart.find(p => p.id === id),
    // вывести корзину как строку
    cartToString (state) {
      let str = 'id - name - count\n---------------------\n';
      state.cart.forEach(product => {
        str += `${product.id} - ${product.title.slice(0, 43)} - ${product.cart}\n`
      });
      return str
    },
    cart: state => () => state.cart,
    goods: state => () => state.goods
  }
})

export default store
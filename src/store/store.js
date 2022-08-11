import {createStore} from 'vuex'

// Здесь хранятся все данные (товары, корзина, валюта)
const store = createStore({
  state() {
    return {
      goods: [],
      cart: [],
      rub: 20,
      isCurrUp: false
    }
  },
  mutations: {
    // добавить новый товар
    addToCart(state, good) {
      state.cart.push(good);
    },
    // удалить товар по id
    removeFromCart(state, id) {
      let removeIndex = state.cart.map(item => item.id).indexOf(id);
      if(removeIndex >= 0) state.cart.splice(removeIndex, 1);
      console.log('Remove: ' + state.getters.cartById(id).title);
    },
    // обновить товары
    setGoods(state, goods) {state.goods = goods},
    // обновить курс и bool повышения/понижения курса
    updateCurrency(state, {curr, isCurrUp}) {
      state.rub = curr;
      state.isCurrUp = isCurrUp
    }
  },
  actions: {
    // выполняется каждые 15 секунд
    // читает исходный файл data.json
    // и обновляет курс доллара
    // который генерится в App.vue
    async getGoods({commit}, {curr, isCurrUp}) {
      let names, list;
      // чтение файлов
      await fetch('data.json').then(response => response.json()).then(json => { if(json.Success) list = JSON.parse(JSON.stringify(json.Value.Goods))});

      await fetch('names.json').then(response => response.json()).then(json => { names = JSON.parse(JSON.stringify(json))});

      let all = [];
      // распределение на группы
      list.forEach((el) => {
        let group = all.find(x => x.id === el.G);
        if(group) {
          group.goods.push({
            id: el.T,
            title: names[el.G].B[el.T].N,
            price: el.C,
            price_rub: curr* el.C,
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
              price_rub: curr* el.C,
              count: el.P
            }]
          });
        }
      });

      // сохранение
      commit('setGoods', all);
      commit('updateCurrency', {curr, isCurrUp});
    },
  },
  getters: {
    // вернуть товар из корзины по id
    cartById: state => id => state.cart.find(p => p.id === id),
    // вывести корзину как строку
    cartToString(state) {
      let str = 'id - name - count\n---------------------\n';
      state.cart.forEach(product => {
        str += `${product.id} - ${product.title.slice(0, 43)} - ${product.cart}\n`
      });
      return str
    },
    cart: state => () => state.cart, // вся корзина
    goods: state => () => state.goods // все товары
  }
})

export default store
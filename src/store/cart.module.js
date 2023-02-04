
export const cart = {
  namespaced: true,
  state: {
    cartList:[

    ],
    totalCartItem:0
  },
  actions: {
   
  },
  mutations: {
    addProductToCart(state, product) {
        state.cartList.push(product)
        state.totalCartItem ++;
    },
  }
};
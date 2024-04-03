type cartItem = {
  name: string;
  price: number;
};

type cart = (cartItem & { quantity: number })[];

const fakeBuy = async (cart: cart) => {
  await new Promise(resolve => setTimeout(resolve, 3000))
  if (Math.random() > 0.5) {
    return false
  }
  console.log(
    `bought ${cart
      .map(v => v.quantity)
      .reduce((a, b) => a + b)} items for ${cart
      .map(v => v.quantity * v.price)
      .reduce((a, b) => a + b)}`
  )
  return true
}

export const useCartStore = defineStore({
  id: 'cart',
  state: (): { cart: cart } => ({
    cart: []
  }),
  getters: {
    totalPrice: (state) => {
      return state.cart
        .map(v => v.quantity * v.price)
        .reduce((a, b) => a + b)
    }
  },
  actions: {
    addItem (item: cartItem) {
      const existing = this.cart.find(
        v => v.name === item.name && v.price - item.price < 0.01
      )
      if (existing === undefined) {
        this.cart.push({ ...item, quantity: 1 })
      } else {
        existing.quantity++
      }
    },
    removeItem (item: cartItem) {
      const existing = this.cart.findIndex(
        v => v.name === item.name && v.price - item.price < 0.01
      )
      if (existing === -1) {
        return false
      } else {
        if (this.cart[existing].quantity === 0) {
          this.cart.splice(existing, 1)
        } else {
          this.cart[existing].quantity--
        }
        return true
      }
    },
    async buy () {
      const success = await fakeBuy(this.cart)
      if (success) {
        this.$reset()
      } else {
        console.log('failed to buy')
      }
    }
  }
})

class Order {
  pizzas = [];

  get totalPrice() {
    return this.pizzas.reduce((totalPrice, pizza) => {
      if (pizza.pizzaPrice === 0) {
        throw Error(`Pizza can't cost 0 USD`)
      } else if (!pizza.pizzaPrice) {
        throw Error(`Pizza must have a price`)
      } else {
        return totalPrice + pizza.pizzaPrice;
      }
    }, 0)
  }

  addPizza(pizza) {
    this.pizzas.push(pizza);
  }

  removePizza(pizza) {
    const index = this.pizzas.indexOf(pizza);

    this.pizzas.splice(index, 1);
  }
}

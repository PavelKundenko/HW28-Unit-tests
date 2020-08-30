describe('order.js', () => {
  let order;
  beforeEach(() => {
    order = new Order();
    order.addPizza(new Pizza(['olives', 'sausage', 'mushrooms'], 'large'));
    order.addPizza(new Pizza(['ham', 'sausage', 'bacon'], 'small'));
    order.addPizza(new Pizza(['pineapple', 'pepperoni', 'mushrooms'], 'medium'));
  });

  it('should have common methods', () => {
    expect(order.totalPrice).toBeDefined();
    expect(order.removePizza).toBeFunction();
    expect(order.addPizza).toBeDefined();
    expect(order.addPizza).toBeFunction();
    expect(order.removePizza).toBeDefined();
    expect(order.removePizza).toBeFunction();
  });

  it('should have array of pizzas', () => {
    expect(order.pizzas).toBeDefined();
    expect(order.pizzas).toBeArrayOfObjects();
  });

  describe('get totalPrice()', () => {
    it('should return number', () => {
      expect(order.totalPrice).toBeNumber();
    });

    it('should count total price', () => {
      expect(order.totalPrice).toBe(6.15);
    });

    it(`should throw an error 'Pizza can't cost 0 USD' in case of pizza price is 0`, () => {
      const wrongOrder = new Order();
      wrongOrder.addPizza(new Pizza([], 'large'));
      expect(() => wrongOrder.totalPrice).toThrowError(Error, `Pizza can't cost 0 USD`);
    });

    it('should throw an error in case of pizza price is undefined', () => {
      const wrongOrder = new Order();
      wrongOrder.addPizza({});
      expect(() => wrongOrder.totalPrice).toThrowError(Error, 'Pizza must have a price');
    });
  });

  describe('addPizza()', () => {
    it('should push new object to array of pizzas', () => {
      spyOn(order.pizzas, 'push');
      const newPizza = new Pizza(['ham', 'pineapple'], 'small');
      order.addPizza(newPizza);
      expect(order.pizzas.push).toHaveBeenCalled();
      expect(order.pizzas.push).toHaveBeenCalledTimes(1);
      expect(order.pizzas.push).toHaveBeenCalledWith(newPizza);
    });
  });

  describe('removePizza()', () => {
    it('should find index of removing object', () => {
      const removingPizza = order.pizzas[1];
      spyOn(order.pizzas, 'indexOf');
      order.removePizza(removingPizza);
      expect(order.pizzas.indexOf).toHaveBeenCalled();
      expect(order.pizzas.indexOf).toHaveBeenCalledTimes(1);
      expect(order.pizzas.indexOf).toHaveBeenCalledWith(removingPizza);
    });

    it('should remove an element with index from pizzas array', () => {
      const removingPizza = order.pizzas[1];
      spyOn(order.pizzas, 'splice');
      order.removePizza(removingPizza);
      expect(order.pizzas.splice).toHaveBeenCalled();
      expect(order.pizzas.splice).toHaveBeenCalledTimes(1);
      expect(order.pizzas.splice).toHaveBeenCalledWith(1, 1);
    });
  });
});

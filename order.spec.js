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
      const newPizza = new Pizza([], 'small');
      const newPizza2 = new Pizza([], 'large');

      const newOrder = new Order();

      newOrder.addPizza(newPizza);
      newOrder.addPizza(newPizza2);

      spyOnProperty(newPizza, 'pizzaPrice', 'get').and.returnValue(2);
      spyOnProperty(newPizza2, 'pizzaPrice', 'get').and.returnValue(4);

      expect(newOrder.totalPrice).toBe(6);
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
      const newPizza = new Pizza(['ham', 'pineapple'], 'small');

      spyOn(order.pizzas, 'push');

      order.addPizza(newPizza);

      expect(order.pizzas.push).toHaveBeenCalled();
      expect(order.pizzas.push).toHaveBeenCalledTimes(1);
      expect(order.pizzas.push).toHaveBeenCalledWith(newPizza);
    });
  });

  describe('removePizza()', () => {
    it('should find index of removing object', () => {
      const removingPizza = order.pizzas[1];

      const spyIndexOf = spyOn(order.pizzas, 'indexOf');

      order.removePizza(removingPizza);

      expect(spyIndexOf).toHaveBeenCalled();
      expect(spyIndexOf).toHaveBeenCalledTimes(1);
      expect(spyIndexOf).toHaveBeenCalledWith(removingPizza);
    });

    it('should remove an element with index from pizzas array', () => {
      const removingPizza = order.pizzas[1];

      const spySlice = spyOn(order.pizzas, 'splice');

      order.removePizza(removingPizza);

      expect(spySlice).toHaveBeenCalled();
      expect(spySlice).toHaveBeenCalledTimes(1);
      expect(spySlice).toHaveBeenCalledWith(1, 1);
    });
  });
});

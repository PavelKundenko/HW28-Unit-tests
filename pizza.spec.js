describe('pizza.js', () => {
  let pizza;

  beforeEach(() => {
    pizza = new Pizza(['olives', 'sausage', 'mushrooms'], 'large');
  });

  it('should have properties', () => {
    expect(pizza.toppings).toBeDefined();
    expect(pizza.toppings).toBeArrayOfStrings();

    expect(pizza.size).toBeDefined();
    expect(pizza.size).toBeString();
  });

  it('should have getters', () => {
    expect(pizza.pizzaPrice).toBeDefined();

    expect(pizza.toppingsPrice).toBeDefined();
  });

  it('should be unique Pizza', () => {
    const newPizza = new Pizza(['olives', 'sausage', 'mushrooms'], 'large');

    expect(pizza).toBeInstanceOf(Pizza);
    expect(pizza).not.toBe(newPizza);
  });

  describe('get pizzaPrice()', () => {
    it('should return number', () => {
      expect(pizza.pizzaPrice).toBeNumber();
    });

    it('should get toppingsPrice property', function () {
      const spy = spyOnProperty(pizza, 'toppingsPrice', 'get').and.returnValue(5);

      pizza.pizzaPrice;

      expect(spy).toHaveBeenCalled();
    });

    it('should count pizza price', () => {
      spyOnProperty(pizza, 'toppingsPrice', 'get').and.returnValue(5);

      expect(pizza.pizzaPrice).toBe(10);
    });

    it(`should throw an error 'Size can't find' in case of size is undefined or size is't proper`, () => {
      const pizzaWithoutSize = new Pizza([]);
      expect(() => pizzaWithoutSize.pizzaPrice).toThrowError(Error, `Size can't find`);
      const pizzaWithWrongSize = new Pizza([], 'xxl');
      expect(() => pizzaWithWrongSize.pizzaPrice).toThrowError(Error, `Size can't find`);
    });
  });

  describe('get toppingsPrice()', () => {
    it('should return number', () => {
      expect(pizza.toppingsPrice).toBeNumber();
    });

    it('should return 0 in case of toppings list is empty', () => {
      const pizzaWithoutToppings = new Pizza([]);
      expect(pizzaWithoutToppings.toppingsPrice).toBeFalsy();
      expect(pizzaWithoutToppings.toppingsPrice).toBe(0);
    });

    it('should count topping price', () => {
      expect(pizza.toppingsPrice).toBe(1.05);
    });

    it('should invoke reduce method', () => {
      spyOn(pizza.toppings, 'reduce');
      pizza.toppingsPrice;
      expect(pizza.toppings.reduce).toHaveBeenCalled();
      expect(pizza.toppings.reduce).toHaveBeenCalledTimes(1);
    });

    it('should throw error in case of Pizza.toppings is undefined', () => {
      const pizzaWithoutToppings = new Pizza(undefined, 'small');
      expect(() => pizzaWithoutToppings.toppingsPrice).toThrow();
    });

    it(`should throw an error in case of topping doesn't match the list`, () => {
      const toppings = ['bacon', 'pineapple', 'pork steak', 'olives'];
      const pizzaWithImproperTopping = new Pizza(toppings);
      expect(() => pizzaWithImproperTopping.toppingsPrice).toThrowError(Error, `Topping ${toppings[2]} can't find`);
    });
  });
});

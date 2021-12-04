const assert = require('assert');
const fetch = require('node-fetch');


describe('Orders', function() {
  describe('Create new order and list it', function() {
    it('should return "Order created"', async function() {
      const order = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@a.a',
        phone: '123123123',
        street: 'asdasda',
        city: 'asdasda',
        zip: '12313',
        products: [
          {
            id: 1,
            amount: 2,
            price: 2.4,
          },
        ],
      };
      const raw = await fetch('http://localhost:5050/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      const orderData = await raw.json();
      assert.equal(orderData.message, 'Order created');
    });
    it('should return array of orders', async function() {
      const raw = await fetch('http://localhost:5050/orders');
      const orders = await raw.json();
      assert.equal(orders.length > 0, true);
    });
    it('should update order state', async function() {
      const raw = await fetch('http://localhost:5050/order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          state: 'delivered',
        }),
      });
      const order = await raw.json();
      assert.equal(order.message, 'Order updated');
    });
  });
});



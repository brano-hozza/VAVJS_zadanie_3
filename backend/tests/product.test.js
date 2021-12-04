const assert = require('assert');
const fetch = require('node-fetch');

describe('Products', function() {
  describe('Create', function() {
    it('should return "Product created"', async function() {
      const raw = await fetch('http://localhost:5050/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Product 1',
          price: 100,
        }),
      });
      const product = await raw.json();
      assert.equal(product.message, 'Product created');
    });
  });
  describe('Get created product', function() {
    it('should return json with product', async function() {
      const raw = await fetch('http://localhost:5050/product/1');
      const product = await raw.json();
      assert.equal(product.product_name, 'Furik');
    });
  });
  describe('Get all products', function() {
    it('Should return all products', async function() {
      const raw = await fetch('http://localhost:5050/products');
      const products = await raw.json();
      assert.equal(products.length > 1, true);
    });
  });
});



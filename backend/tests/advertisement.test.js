const assert = require('assert');
const fetch = require('node-fetch');

describe('Advertisement', function() {
  describe('Create', function() {
    it('should return "Advertisement created"', async function() {
      const raw = await fetch('http://localhost:5050/advertisement/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: 'http://www.amazon.com',
        }),
      });
      const add = await raw.json();
      assert.equal(add.message, 'Advertisement created');
    });
  });
  describe('Get random add', function() {
    it('should return random add', async function() {
      const raw = await fetch('http://localhost:5050/advertisement');
      const add = await raw.json();
      assert.notEqual(add.link, undefined);
    });
  });
});



const assert = require('assert');
const fetch = require('node-fetch');

describe('Users', function() {
  let id = 0;
  before(async function() {
    const raw = await fetch('http://localhost:5050/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: 'Testovac 1',
      }),
    });
    const user = await raw.json();
    id = user.id;
  });
  describe('Create', function() {
    it('should return "User created"', async function() {
      const raw = await fetch('http://localhost:5050/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: 'User 1',
        }),
      });
      const user = await raw.json();
      assert.equal(user.message, 'User created');
    });
  });
  describe('Get created user', function() {
    it('should return json with user', async function() {
      const raw = await fetch('http://localhost:5050/user/'+id);
      const user = await raw.json();
      assert.equal(user.first_name, 'Testovac 1');
    });
  });
});



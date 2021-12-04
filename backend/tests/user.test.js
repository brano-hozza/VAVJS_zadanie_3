const assert = require('assert');
const fetch = require('node-fetch');

describe('Users', function() {
  describe('Create, get all', function() {
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
    it('should return array of users', async function() {
      const raw = await fetch('http://localhost:5050/users');
      const users = await raw.json();
      assert.equal(users.length > 0, true);
    });
  });
});



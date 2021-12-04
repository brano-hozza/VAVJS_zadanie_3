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
    it('click the add', async function() {
      const raw = await fetch('http://localhost:5050/advertisement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
        }),
      });
      const add = await raw.json();
      assert.equal(add.message, 'Advertisement clicked');
    });
    it('update the add link', async function() {
      const raw = await fetch('http://localhost:5050/advertisement/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: 'http://www.google.sk',
        }),
      });
      const add = await raw.json();
      assert.equal(add.message, 'Advertisement updated');
    });
  });
  describe('Get random add', function() {
    it('should return random add', async function() {
      const raw = await fetch('http://localhost:5050/advertisement');
      const add = await raw.json();
      assert.notEqual(add.link, undefined);
    });
  });
  describe('Get all adds', function() {
    it('should return array of adds', async function() {
      const raw = await fetch('http://localhost:5050/advertisements');
      const adds = await raw.json();
      assert.equal(adds.length>0, true);
    });
  });
});



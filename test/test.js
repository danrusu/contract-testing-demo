const nock = require('nock');
const products = require('../data/products.json');

const scope = nock('http://localhost:1113').get('/products').reply(200, {
  products,
});

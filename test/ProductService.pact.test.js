const nock = require('nock');
const products = require('../data/products.json');
const { ProductService } = require('../src/consumer/ProductService');

const PRODUCER_URL = 'http://localhost:1113';
const productService = new ProductService(PRODUCER_URL);

describe('API', () => {
  test('get all products', async () => {
    const scope = nock(PRODUCER_URL)
      .get('/products')
      .reply(200, products, { 'Access-Control-Allow-Origin': '*' });

    const resProducts = await productService.getProducts();
    expect(resProducts).toEqual(products);
  });
});

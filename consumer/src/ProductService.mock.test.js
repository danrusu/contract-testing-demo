const nock = require('nock');
const products = require('../../data/products.json');
const { ProductService } = require('../../consumer/src/ProductService');

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

  test('get product by id', async () => {
    const product = products[0];
    const scope = nock(PRODUCER_URL)
      .get(`/product/${product.id}`)
      .reply(200, product, { 'Access-Control-Allow-Origin': '*' });

    const resProduct = await productService.getProduct(product.id);
    expect(resProduct).toEqual(product);
  });
});

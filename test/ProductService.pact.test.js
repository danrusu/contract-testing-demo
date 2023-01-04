const path = require('path');
const products = require('../data/products.json');
const { ProductService } = require('../src/consumer/ProductService');

const {
  PactV3,
  MatchersV3,
  SpecificationVersion,
} = require('@pact-foundation/pact');
const { eachLike, like } = MatchersV3;

const provider = new PactV3({
  consumer: 'FrontendWebsite',
  provider: 'ProductService',
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  logLevel: 'warn',
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
});

describe('API Pact test', () => {
  describe('getting all products', () => {
    test('products exist', async () => {
      // set up Pact interactions
      await provider.addInteraction({
        states: [{ description: 'products exist' }],
        uponReceiving: 'get all products',
        withRequest: {
          method: 'GET',
          path: '/products',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: eachLike(products[0]),
        },
      });

      await provider.executeTest(async mockService => {
        const productService = new ProductService(mockService.url);

        // make request to Pact mock server
        const products = await productService.getProducts();

        expect(products).toStrictEqual([products[0]]);
      });
    });
  });
  describe('getting one product by ID', () => {
    test('product with ID 100 exists', async () => {
      // set up Pact interactions
      await provider.addInteraction({
        states: [{ description: 'product with ID 100 exists' }],
        uponReceiving: 'get product with ID 100',
        withRequest: {
          method: 'GET',
          path: '/product/100',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: like(products[0]),
        },
      });

      await provider.executeTest(async mockService => {
        const productService = new ProductService(mockService.url);

        // make request to Pact mock server
        const product = await productService.getProduct(100);

        expect(product).toStrictEqual(products[0]);
      });
    });
  });
});

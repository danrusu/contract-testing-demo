if (typeof window === 'undefined') {
  const fetch2 = require('node-fetch');

  function fetch(...args) {
    return fetch2(...args);
  }
}

class ProductService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getProducts() {
    return fetch(`${this.baseUrl}/products`).then(res => res.json());
  }

  getProduct(productId) {
    return fetch(`${this.baseUrl}/product/${productId}`).then(res =>
      res.json(),
    );
  }
}

if (typeof window === 'undefined') {
  module.exports = { ProductService };
}

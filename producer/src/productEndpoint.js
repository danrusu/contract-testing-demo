const products = require('../../data/products.json');

function getProducts(_req, res) {
  try {
    res.send(products);
  } catch (e) {
    console.log(e);
    res.status(500).send('Failed to get products');
  }
}

function getProduct(req, res) {
  const productId = parseInt(req.params.productId);
  try {
    const product = products.find(product => product.id === productId);
    //delete product.name; // to breack pact - missing the following keys: name
    //product.name = productId; // to breack pact - wrong value
    //product.id = '' + productId; // to breack pact - wrong type
    res.send(product);
  } catch (e) {
    res.status(500).send(`Failed to get product ${productId}`);
  }
}

module.exports = { getProduct, getProducts };

const products = require('../data/products.json');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:1112' }));

// routes
app.get('/products', getProducts);
app.get('/product/:productId', getProduct);

const port = process.env.PORT || 1113;
app.listen(port, () =>
  console.log(`producer listening at http://localhost:${port}/`),
);

function getProducts(_req, res) {
  try {
    const productsHtml = products.map(
      product =>
        `<div id="${product.id}" class="product" onclick="getProduct(${product.id})">` +
        `<span>${product.name}</span><span>${product.price}</span>` +
        '</div>',
    );
    res.send(productsHtml.join(''));
  } catch (e) {
    console.log(e);
    res.status(500).send('Failed to get products');
  }
}

function getProduct(req, res) {
  try {
    const product = products.find(
      product => `${product.id}` === req.params.productId,
    );
    const productHtml = Object.entries(product).reduce(
      (acc, [key, val]) =>
        acc +
        `<div class="productDetail">` +
        `<span>${key}</span><span>${
          key === 'shop' ? val.name + ', ' + val.location : val
        }</span>` +
        '</div>',
      '',
    );
    res.send(productHtml);
  } catch (e) {
    res.status(500).send(`Failed to get product ${productId}`);
  }
}

const products = require('../../data/products.json');

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
    res.send(products);
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
    res.send(product);
  } catch (e) {
    res.status(500).send(`Failed to get product ${productId}`);
  }
}

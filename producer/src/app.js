const { getProduct, getProducts } = require('./ProductService');

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

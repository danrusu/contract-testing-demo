const express = require('express');
const app = express();

const path = require('path');

const serveFileFromRoot = relativePath => (_req, res) =>
  res.sendFile(path.join(`${__dirname}/${relativePath}`));

// routes
app.get('/', serveFileFromRoot('index.html'));
app.get('/ProductService', serveFileFromRoot('ProductService.js'));
app.get('/main', serveFileFromRoot('main.js'));

const port = process.env.PORT || 1112;
app.listen(port, () =>
  console.log(`consumer listening at http://localhost:${port}/`),
);

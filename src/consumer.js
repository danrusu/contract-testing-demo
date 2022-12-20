const express = require('express');
const app = express();
const path = require('path');

const serveFileFromRoot = (res, relativePath) =>
  res.sendFile(path.join(`${__dirname}/${relativePath}`));

const serveHome = (_, res) => serveFileFromRoot(res, 'index.html');

// routes
app.get('/', serveHome);

const port = process.env.PORT || 1112;
app.listen(port, () =>
  console.log(`consumer listening at http://localhost:${port}/`),
);

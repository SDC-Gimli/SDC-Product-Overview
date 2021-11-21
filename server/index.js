const express = require('express');
const db = require('../data/db.js');
const path = require('path');
const axios = require('axios');
const overview = require('../data/overview.js');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/products', async (req, res) => {
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let response = {};
  response = await overview.getAllStyles(page, count);
  if (response === 0) {
    res.sendStatus(400);
  }
  res.send(response);
});

app.get('/api/products/*', async (req, res) => {
  console.log('url: ', req.originalUrl);
  let product_id = req.originalUrl.replace('/api/products/', '');
  console.log(product_id, 'product id');
  let response = {};
  if (req.originalUrl.includes('styles')) {
    product_id = product_id.replace('/styles', '');
    response.product_id = product_id;
    let info = await overview.getStyles(product_id);
    response.results = info;
    res.send(response);
  } else if (req.originalUrl.includes('related')) {
    product_id = product_id.replace('/related', '');
    let related_arr = await overview.getRelated(product_id);
    res.send(related_arr);
  } else {
  response = await overview.getInfo(product_id);
  res.send(response);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

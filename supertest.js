const request = require('supertest');
const express = require('express');
const overview = require('./data/overview.js');
const app = express();

app.get('/api/products/*', async function (req, res) {
  let product_id = req.originalUrl.replace('/api/products/', '');
  let response = {};
  response = await overview.getInfo(product_id);
  res.status(200).send(response);
});

request(app)
  .get('/api/products/4')
  .expect(/slog/)
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });
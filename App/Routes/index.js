const express = require('express');
const products = require('./products');
const users = require('./users');

const router = express.Router();

const routerApi = (app) => {
  app.use('/api/v1', router);

  router.use('/products', products);
  router.use('/users', users);
};

module.exports = routerApi;

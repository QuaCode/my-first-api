const express = require('express');
const { validatorHandler } = require('../Middlewares/validatorHandle');
const ProductServices = require('../Services/products');
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} = require('../Schema/product');

const router = express.Router();
const service = new ProductServices();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = await req.params;

      const product = await service.findOne(id);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const productCreated = await service.create(body);

      res
        .status(201)
        .json({ message: 'Product created', data: productCreated });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const productUpdated = await service.update(id, body);

      res.json({ message: 'Product updated', data: productUpdated });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const productUpdated = await service.delete(id);

    res.json({ message: 'Product deleted', data: productUpdated });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

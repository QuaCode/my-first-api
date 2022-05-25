const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(0);

export const createProductSchema = Joi.object().keys({
  name: name.required(),
  price: price.required(),
});

export const updateProductSchema = Joi.object().keys({
  name,
  price,
});

export const getProductSchema = Joi.object().keys({
  id: id.required(),
});

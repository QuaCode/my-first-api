import { badRequest } from '@hapi/boom';

export const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: true });

    if (error) {
      next(badRequest(error));
    }
    next();
  };
};

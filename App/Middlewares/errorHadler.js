export const logError = (err, req, res, next) => {
  console.error(err);
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

export const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { statusCode, payload } = err.output;
    res.status(statusCode).json(payload);
  }
  next(err);
};

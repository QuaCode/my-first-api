const express = require('express');
import cors from 'cors';
import {
  logError,
  errorHandler,
  boomErrorHandler,
} from './Middlewares/errorHadler';
const routerApi = require('./Routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
};

app.use(cors(corsOptions));

routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);

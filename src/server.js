import express from 'express';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export default function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(router);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}


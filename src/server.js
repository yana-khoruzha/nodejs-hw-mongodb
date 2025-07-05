import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routes/contactsRouter.js';

export default function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use('/contacts', contactsRouter);

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

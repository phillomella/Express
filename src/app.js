import express from 'express';
import toursRouter from './resources/tours/tour.router.js';
import schedulesRouter from './resources/schedules/schedule.router.js';
import pricesRouter from './resources/prices/price.router.js';

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/tours', toursRouter);
app.use('/schedules', schedulesRouter);
app.use('/prices', pricesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
import { Router } from 'express';
import * as toursService from './tour.service.js';
import Tour from './tour.model.js';
import schedulesRouter from '../schedules/schedule.router.js';

const router = Router();

// GET /tours - Получить все туры
router.route('/').get(async (req, res) => {
  const tours = await toursService.getAll();
  res.json(tours.map(Tour.toResponse));
});

// POST /tours - Создать тур
router.route('/').post(async (req, res) => {
  const tour = await toursService.create(req.body);
  res.status(201).json(Tour.toResponse(tour));
});

// GET /tours/:tourId - Получить тур по ID
router.route('/:tourId').get(async (req, res) => {
  const tour = await toursService.getById(req.params.tourId);
  if (tour) {
    res.json(Tour.toResponse(tour));
  } else {
    res.status(404).json({ error: 'Tour not found' });
  }
});

// PUT /tours/:tourId - Обновить тур
router.route('/:tourId').put(async (req, res) => {
  const tour = await toursService.update(req.params.tourId, req.body);
  if (tour) {
    res.json(Tour.toResponse(tour));
  } else {
    res.status(404).json({ error: 'Tour not found' });
  }
});

// DELETE /tours/:tourId - Удалить тур
router.route('/:tourId').delete(async (req, res) => {
  const tour = await toursService.remove(req.params.tourId);
  if (tour) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Tour not found' });
  }
});

// Вложенный маршрут для расписаний
router.use('/:tourId/schedules', schedulesRouter);

export default router;
import { Router } from 'express';
import * as toursService from './tour.service.js';
import Tour from './tour.model.js';
import schedulesRouter from '../schedules/schedule.router.js';

const router = Router();

router.route('/')
  .get(async (req, res) => {
    const tours = await toursService.getAll();
    res.json(tours.map(Tour.toResponse));
  })
  .post(async (req, res) => {
    const tour = await toursService.create(req.body);
    res.status(201).json(Tour.toResponse(tour));
  });

router.route('/:tourId')
  .get(async (req, res) => {
    const tour = await toursService.getById(req.params.tourId);
    if (tour) {
      res.json(Tour.toResponse(tour));
    } else {
      res.status(404).json({ error: 'Tour not found' });
    }
  })
  .put(async (req, res) => {
    const tour = await toursService.update(req.params.tourId, req.body);
    if (tour) {
      res.json(Tour.toResponse(tour));
    } else {
      res.status(404).json({ error: 'Tour not found' });
    }
  })
  .delete(async (req, res) => {
    const tour = await toursService.remove(req.params.tourId);
    if (tour) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Tour not found' });
    }
  });

router.use('/:tourId/schedules', schedulesRouter);

export default router;
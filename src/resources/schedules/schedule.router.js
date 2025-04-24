import { Router } from 'express';
import * as schedulesService from './schedule.service.js';
import Schedule from './schedule.model.js';
import pricesRouter from '../prices/price.router.js';

const router = Router();

router.route('/')
  .get(async (req, res) => {
    const schedules = await schedulesService.getAll();
    res.json(schedules.map(Schedule.toResponse));
  })
  .post(async (req, res) => {
    try {
      const schedule = await schedulesService.create(req.body);
      res.status(201).json(Schedule.toResponse(schedule));
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });

router.route('/:scheduleId')
  .get(async (req, res) => {
    const schedule = await schedulesService.getById(req.params.scheduleId);
    if (schedule) {
      res.json(Schedule.toResponse(schedule));
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  })
  .put(async (req, res) => {
    const schedule = await schedulesService.update(req.params.scheduleId, req.body);
    if (schedule) {
      res.json(Schedule.toResponse(schedule));
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  })
  .delete(async (req, res) => {
    const schedule = await schedulesService.remove(req.params.scheduleId);
    if (schedule) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  });

router.use('/:scheduleId/prices', pricesRouter);

export default router;
import { Router } from 'express';
import * as pricesService from './price.service.js';
import Price from './price.model.js';

const router = Router();

router.route('/')
  .get(async (req, res) => {
    const prices = await pricesService.getAll();
    res.json(prices.map(Price.toResponse));
  })
  .post(async (req, res) => {
    try {
      const price = await pricesService.create(req.body);
      res.status(201).json(Price.toResponse(price));
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });

router.route('/:priceId')
  .get(async (req, res) => {
    const price = await pricesService.getById(req.params.priceId);
    if (price) {
      res.json(Price.toResponse(price));
    } else {
      res.status(404).json({ error: 'Price not found' });
    }
  })
  .put(async (req, res) => {
    const price = await pricesService.update(req.params.priceId, req.body);
    if (price) {
      res.json(Price.toResponse(price));
    } else {
      res.status(404).json({ error: 'Price not found' });
    }
  })
  .delete(async (req, res) => {
    const price = await pricesService.remove(req.params.priceId);
    if (price) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Price not found' });
    }
  });

export default router;
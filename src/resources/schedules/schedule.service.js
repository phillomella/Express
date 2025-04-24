import * as schedulesRepo from './schedule.memory.repository.js';
import * as toursService from '../tours/tour.service.js';
import * as pricesService from '../prices/price.service.js';

export const getAll = async () => schedulesRepo.getAll();
export const getById = async (id) => schedulesRepo.getById(id);
export const getByTourId = async (tourId) => schedulesRepo.getByTourId(tourId);
export const create = async (scheduleData) => {
  const tour = await toursService.getById(scheduleData.tourId);
  if (!tour) {
    throw new Error('Tour not found');
  }
  return schedulesRepo.create(scheduleData);
};
export const update = async (id, scheduleData) => schedulesRepo.update(id, scheduleData);
export const remove = async (id) => {
  const schedule = await schedulesRepo.remove(id);
  if (schedule) {
    const prices = await pricesService.getByScheduleId(id);
    await Promise.all(prices.map(price => 
      pricesService.remove(price.id)
    ));
  }
  return schedule;
};
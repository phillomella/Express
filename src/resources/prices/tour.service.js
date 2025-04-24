import * as pricesRepo from './price.memory.repository.js';
import * as schedulesService from '../schedules/schedule.service.js';

export const getAll = async () => pricesRepo.getAll();
export const getById = async (id) => pricesRepo.getById(id);
export const getByScheduleId = async (scheduleId) => pricesRepo.getByScheduleId(scheduleId);
export const create = async (priceData) => {
  const schedule = await schedulesService.getById(priceData.scheduleId);
  if (!schedule) {
    throw new Error('Schedule not found');
  }
  return pricesRepo.create(priceData);
};
export const update = async (id, priceData) => pricesRepo.update(id, priceData);
export const remove = async (id) => pricesRepo.remove(id);
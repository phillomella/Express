import * as toursRepo from './tour.memory.repository.js';
import * as schedulesService from '../schedules/schedule.service.js';

export const getAll = async () => toursRepo.getAll();
export const getById = async (id) => toursRepo.getById(id);
export const create = async (tourData) => toursRepo.create(tourData);
export const update = async (id, tourData) => toursRepo.update(id, tourData);
export const remove = async (id) => {
  const tour = await toursRepo.remove(id);
  if (tour) {
    const schedules = await schedulesService.getByTourId(id);
    await Promise.all(schedules.map(schedule => 
      schedulesService.remove(schedule.id)
    ));
  }
  return tour;
};
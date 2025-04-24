import Schedule from './schedule.model.js';

const schedules = [];

export const getAll = async () => schedules;
export const getById = async (id) => schedules.find(schedule => schedule.id === id);
export const getByTourId = async (tourId) => schedules.filter(schedule => schedule._productId === tourId);
export const create = async (scheduleData) => {
  const schedule = new Schedule(scheduleData);
  schedules.push(schedule);
  return schedule;
};
export const update = async (id, scheduleData) => {
  const index = schedules.findIndex(schedule => schedule.id === id);
  if (index !== -1) {
    schedules[index] = { 
      ...schedules[index], 
      ...scheduleData, 
      updatedAt: new Date() 
    };
    return schedules[index];
  }
  return null;
};
export const remove = async (id) => {
  const index = schedules.findIndex(schedule => schedule.id === id);
  if (index !== -1) {
    return schedules.splice(index, 1)[0];
  }
  return null;
};
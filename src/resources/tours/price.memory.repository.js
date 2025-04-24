import Tour from './tour.model.js';

const tours = [];

export const getAll = async () => tours;
export const getById = async (id) => tours.find(tour => tour.id === id);
export const create = async (tourData) => {
  const tour = new Tour(tourData);
  tours.push(tour);
  return tour;
};
export const update = async (id, tourData) => {
  const index = tours.findIndex(tour => tour.id === id);
  if (index !== -1) {
    tours[index] = { ...tours[index], ...tourData, updatedAt: new Date() };
    return tours[index];
  }
  return null;
};
export const remove = async (id) => {
  const index = tours.findIndex(tour => tour.id === id);
  if (index !== -1) {
    return tours.splice(index, 1)[0];
  }
  return null;
};
import Price from './price.model.js';

const prices = [];

export const getAll = async () => prices;
export const getById = async (id) => prices.find(price => price.id === id);
export const getByScheduleId = async (scheduleId) => prices.filter(price => price._scheduled === scheduleId);
export const create = async (priceData) => {
  const price = new Price(priceData);
  prices.push(price);
  return price;
};
export const update = async (id, priceData) => {
  const index = prices.findIndex(price => price.id === id);
  if (index !== -1) {
    prices[index] = { 
      ...prices[index], 
      ...priceData, 
      updatedAt: new Date() 
    };
    return prices[index];
  }
  return null;
};
export const remove = async (id) => {
  const index = prices.findIndex(price => price.id === id);
  if (index !== -1) {
    return prices.splice(index, 1)[0];
  }
  return null;
};
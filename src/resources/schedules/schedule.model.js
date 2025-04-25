import { v4 as uuidv4 } from 'uuid';

export default class Schedule {
  constructor({
    id = uuidv4(),
    tourId = '',
    isActive = true,
    startDate = new Date(),
    endDate = new Date()
  } = {}) {
    this.id = id;
    this._productId = tourId;
    this.isActive = isActive;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static toResponse(schedule) {
    const { id, _productId, isActive, startDate, endDate } = schedule;
    return { id, tourId: _productId, isActive, startDate, endDate };
  }
}
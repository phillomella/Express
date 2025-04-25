import { v4 as uuidv4 } from 'uuid';

export default class Price {
  constructor({
    id = uuidv4(),
    scheduleId = '',
    priceValue = 0,
    priceCurrency = 'USD'
  } = {}) {
    this.id = id;
    this._scheduled = scheduleId;
    this.priceValue = priceValue;
    this.priceCurrency = priceCurrency;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static toResponse(price) {
    const { id, _scheduled, priceValue, priceCurrency } = price;
    return { id, scheduleId: _scheduled, priceValue, priceCurrency };
  }
}
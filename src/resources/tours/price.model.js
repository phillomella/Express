import { v4 as uuidv4 } from 'uuid';
import config from '../../common/config.js';

export default class Tour {
  constructor({
    id = uuidv4(),
    title = '',
    slug = '',
    description = '',
    isVisible = config.DEFAULT_ACTIVE_STATUS
  } = {}) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.isVisible = isVisible;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static toResponse(tour) {
    const { id, title, slug, description, isVisible } = tour;
    return { id, title, slug, description, isVisible };
  }
}
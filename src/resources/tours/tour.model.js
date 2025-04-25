import { v4 as uuidv4 } from 'uuid';

export default class Tour {
  constructor({
    id = uuidv4(),
    title = '',
    slug = '',
    description = '',
    isVisible = true
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
import { TagRepository } from 'data/repositories';

class TagService {
  static create(name, description, books) {
    return TagRepository.create(name, description, books);
  }

  static get(id) {
    return TagRepository.get(id);
  }

  static getAll(args) {
    return TagRepository.getAll(args);
  }

  static update(id, name, description, books) {
    return TagRepository.update(id, name, description, books);
  }

  static partialUpdate(id, name, description, books) {
    return TagRepository.partialUpdate({ id, name, description, books });
  }

  static destroy(id) {
    return TagRepository.destroy(id);
  }
}

export { TagService };

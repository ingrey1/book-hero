import { GenreRepository } from 'data/repositories';

class GenreService {
  static create(name, description, books) {
    return GenreRepository.create(name, description, books);
  }

  static get(id) {
    return GenreRepository.get(id);
  }

  static getAll(args) {
    return GenreRepository.getAll(args);
  }

  static update(id, name, description, books) {
    return GenreRepository.update(id, name, description, books);
  }

  static partialUpdate(id, name, description, books) {
    return GenreRepository.partialUpdate({ id, name, description, books });
  }

  static destroy(id) {
    return GenreRepository.destroy(id);
  }
}

export { GenreService };

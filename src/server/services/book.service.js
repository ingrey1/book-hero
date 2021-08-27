import { BookRepository } from 'data/repositories';

class BookService {
  static create(title, about, authors, genres, tags) {
    return BookRepository.create(title, about, authors, genres, tags);
  }

  static get(id) {
    return BookRepository.get(id);
  }

  static getAll(args) {
    return BookRepository.getAll(args);
  }

  static update(id, title, about, authors, genres, tags) {
    return BookRepository.update(id, title, about, authors, genres, tags);
  }

  static partialUpdate(id, title, about, authors, genres, tags) {
    return BookRepository.partialUpdate({
      id,
      title,
      about,
      authors,
      genres,
      tags,
    });
  }

  static destroy(id) {
    return BookRepository.destroy(id);
  }
}

export { BookService };

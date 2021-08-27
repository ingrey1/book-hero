import { AuthorRepository } from 'data/repositories';

class AuthorService {
  static create(firstName, lastName, age, books) {
    return AuthorRepository.create(firstName, lastName, age, books);
  }

  static get(id) {
    return AuthorRepository.get(id);
  }

  static getAll(args) {
    return AuthorRepository.getAll(args);
  }

  static update(id, firstName, lastName, age, books) {
    return AuthorRepository.update(id, firstName, lastName, age, books);
  }

  static partialUpdate(id, firstName, lastName, age, books) {
    return AuthorRepository.partialUpdate({
      id,
      firstName,
      lastName,
      age,
      books,
    });
  }

  static destroy(id) {
    return AuthorRepository.destroy(id);
  }
}

export { AuthorService };

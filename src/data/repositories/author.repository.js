import { Author } from 'data/models';
import { NotFound } from 'server/utils/errors';

class AuthorRepository {
  static async create(firstName, lastName, age, books) {
    const createdAuthor = await Author.create({
      firstName,
      lastName,
      age,
    });

    if (books) await createdAuthor.setBooks(books);

    return createdAuthor;
  }

  static get(id) {
    return Author.findByPk(id, { include: ['books'] });
  }

  static getAll(filters) {
    return Author.findAll({
      where: filters,
      include: ['books'],
    });
  }

  static async update(id, firstName, lastName, age, books) {
    return this.partialUpdate({
      id,
      firstName,
      lastName,
      age,
      books,
    });
  }

  static async partialUpdate({ id, firstName, lastName, age, books }) {
    const foundAuthor = await Author.findByPk(id);
    if (!foundAuthor)
      throw new NotFound(`Author with primary key ${id} not found`);
    if (firstName !== undefined) foundAuthor.firstName = firstName;
    if (lastName !== undefined) foundAuthor.lastName = lastName;
    if (age !== undefined) foundAuthor.age = age;
    if (books !== undefined) await foundAuthor.setBooks(books);
    await foundAuthor.save();
    return foundAuthor.reload();
  }

  static async destroy(id) {
    const foundAuthor = await Author.findByPk(id);
    if (!foundAuthor)
      throw new NotFound(`Author with primary key ${id} not found`);
    await foundAuthor.destroy();
    return foundAuthor;
  }
}

export { AuthorRepository };

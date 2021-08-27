import { Book } from 'data/models';
import { NotFound } from 'server/utils/errors';

class BookRepository {
  static async create(title, about, authors, genres, tags) {
    const createdBook = await Book.create({
      title,
      about,
    });

    if (authors) await createdBook.setAuthors(authors);

    if (genres) await createdBook.setGenres(genres);

    if (tags) await createdBook.setTags(tags);

    return createdBook;
  }

  static get(id) {
    return Book.findByPk(id, { include: ['authors', 'genres', 'tags'] });
  }

  static getAll(filters) {
    return Book.findAll({
      where: filters,
      include: ['authors', 'genres', 'tags'],
    });
  }

  static async update(id, title, about, authors, genres, tags) {
    return this.partialUpdate({
      id,
      title,
      about,
      authors,
      genres,
      tags,
    });
  }

  static async partialUpdate({ id, title, about, authors, genres, tags }) {
    const foundBook = await Book.findByPk(id);
    if (!foundBook) throw new NotFound(`Book with primary key ${id} not found`);
    if (title !== undefined) foundBook.title = title;
    if (about !== undefined) foundBook.about = about;
    if (authors !== undefined) await foundBook.setAuthors(authors);
    if (genres !== undefined) await foundBook.setGenres(genres);
    if (tags !== undefined) await foundBook.setTags(tags);
    await foundBook.save();
    return foundBook.reload();
  }

  static async destroy(id) {
    const foundBook = await Book.findByPk(id);
    if (!foundBook) throw new NotFound(`Book with primary key ${id} not found`);
    await foundBook.destroy();
    return foundBook;
  }
}

export { BookRepository };

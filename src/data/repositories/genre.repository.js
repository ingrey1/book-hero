import { Genre } from 'data/models';
import { NotFound } from 'server/utils/errors';

class GenreRepository {
  static async create(name, description, books) {
    const createdGenre = await Genre.create({
      name,
      description,
    });

    if (books) await createdGenre.setBooks(books);

    return createdGenre;
  }

  static get(id) {
    return Genre.findByPk(id, { include: ['books'] });
  }

  static getAll(filters) {
    return Genre.findAll({
      where: filters,
      include: ['books'],
    });
  }

  static async update(id, name, description, books) {
    return this.partialUpdate({
      id,
      name,
      description,
      books,
    });
  }

  static async partialUpdate({ id, name, description, books }) {
    const foundGenre = await Genre.findByPk(id);
    if (!foundGenre)
      throw new NotFound(`Genre with primary key ${id} not found`);
    if (name !== undefined) foundGenre.name = name;
    if (description !== undefined) foundGenre.description = description;
    if (books !== undefined) await foundGenre.setBooks(books);
    await foundGenre.save();
    return foundGenre.reload();
  }

  static async destroy(id) {
    const foundGenre = await Genre.findByPk(id);
    if (!foundGenre)
      throw new NotFound(`Genre with primary key ${id} not found`);
    await foundGenre.destroy();
    return foundGenre;
  }
}

export { GenreRepository };

import { Tag } from 'data/models';
import { NotFound } from 'server/utils/errors';

class TagRepository {
  static async create(name, description, books) {
    const createdTag = await Tag.create({
      name,
      description,
    });

    if (books) await createdTag.setBooks(books);

    return createdTag;
  }

  static get(id) {
    return Tag.findByPk(id, { include: ['books'] });
  }

  static getAll(filters) {
    return Tag.findAll({
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
    const foundTag = await Tag.findByPk(id);
    if (!foundTag) throw new NotFound(`Tag with primary key ${id} not found`);
    if (name !== undefined) foundTag.name = name;
    if (description !== undefined) foundTag.description = description;
    if (books !== undefined) await foundTag.setBooks(books);
    await foundTag.save();
    return foundTag.reload();
  }

  static async destroy(id) {
    const foundTag = await Tag.findByPk(id);
    if (!foundTag) throw new NotFound(`Tag with primary key ${id} not found`);
    await foundTag.destroy();
    return foundTag;
  }
}

export { TagRepository };

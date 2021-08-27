import { CREATED } from 'http-status';
import { TagService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class TagController {
  static async create(req, res, next) {
    try {
      const { name, description, books } = req.body;
      const newTag = await TagService.create(name, description, books);
      res.locals.status = CREATED;
      res.locals.data = newTag;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const tagObject = await TagService.get(id);
      if (!tagObject) {
        throw new NotFound(`Tag with primary key ${id} not found`);
      }
      res.locals.data = tagObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allTags = await TagService.getAll(filters);
      res.locals.data = allTags;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, books } = req.body;

      const updatedTag = await TagService.update(id, name, description, books);

      res.locals.data = updatedTag;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, books } = req.body;

      const updatedTag = await TagService.partialUpdate(
        id,
        name,
        description,
        books
      );

      res.locals.data = updatedTag;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const tagDelete = await TagService.destroy(id);
      res.locals.data = tagDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { TagController };

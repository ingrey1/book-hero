import { CREATED } from 'http-status';
import { AuthorService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class AuthorController {
  static async create(req, res, next) {
    try {
      const { firstName, lastName, age, books } = req.body;
      const newAuthor = await AuthorService.create(
        firstName,
        lastName,
        age,
        books
      );
      res.locals.status = CREATED;
      res.locals.data = newAuthor;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const authorObject = await AuthorService.get(id);
      if (!authorObject) {
        throw new NotFound(`Author with primary key ${id} not found`);
      }
      res.locals.data = authorObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allAuthors = await AuthorService.getAll(filters);
      res.locals.data = allAuthors;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { firstName, lastName, age, books } = req.body;

      const updatedAuthor = await AuthorService.update(
        id,
        firstName,
        lastName,
        age,
        books
      );

      res.locals.data = updatedAuthor;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { firstName, lastName, age, books } = req.body;

      const updatedAuthor = await AuthorService.partialUpdate(
        id,
        firstName,
        lastName,
        age,
        books
      );

      res.locals.data = updatedAuthor;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const authorDelete = await AuthorService.destroy(id);
      res.locals.data = authorDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { AuthorController };

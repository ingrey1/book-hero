import { CREATED } from 'http-status';
import { BookService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class BookController {
  static async create(req, res, next) {
    try {
      const { title, about, authors, genres, tags } = req.body;
      const newBook = await BookService.create(
        title,
        about,
        authors,
        genres,
        tags
      );
      res.locals.status = CREATED;
      res.locals.data = newBook;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const bookObject = await BookService.get(id);
      if (!bookObject) {
        throw new NotFound(`Book with primary key ${id} not found`);
      }
      res.locals.data = bookObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allBooks = await BookService.getAll(filters);
      res.locals.data = allBooks;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, about, authors, genres, tags } = req.body;

      const updatedBook = await BookService.update(
        id,
        title,
        about,
        authors,
        genres,
        tags
      );

      res.locals.data = updatedBook;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { title, about, authors, genres, tags } = req.body;

      const updatedBook = await BookService.partialUpdate(
        id,
        title,
        about,
        authors,
        genres,
        tags
      );

      res.locals.data = updatedBook;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const bookDelete = await BookService.destroy(id);
      res.locals.data = bookDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { BookController };

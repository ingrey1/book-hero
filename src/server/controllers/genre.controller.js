import { CREATED } from 'http-status';
import { GenreService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class GenreController {
  static async create(req, res, next) {
    try {
      const { name, description, books } = req.body;
      const newGenre = await GenreService.create(name, description, books);
      res.locals.status = CREATED;
      res.locals.data = newGenre;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const genreObject = await GenreService.get(id);
      if (!genreObject) {
        throw new NotFound(`Genre with primary key ${id} not found`);
      }
      res.locals.data = genreObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allGenres = await GenreService.getAll(filters);
      res.locals.data = allGenres;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, books } = req.body;

      const updatedGenre = await GenreService.update(
        id,
        name,
        description,
        books
      );

      res.locals.data = updatedGenre;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, books } = req.body;

      const updatedGenre = await GenreService.partialUpdate(
        id,
        name,
        description,
        books
      );

      res.locals.data = updatedGenre;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const genreDelete = await GenreService.destroy(id);
      res.locals.data = genreDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { GenreController };

import { Router } from 'express';
import { validate } from 'express-validation';
import { GenreController } from 'server/controllers';
import { genreValidation, options } from 'server/validations';

const router = Router();

router.get(
  '/',
  validate(genreValidation.getAll, options),
  GenreController.getAll
);

router.get('/:id', GenreController.get);

router.post(
  '/',
  validate(genreValidation.create, options),
  GenreController.create
);

router.put(
  '/:id',
  validate(genreValidation.update, options),
  GenreController.update
);

router.patch(
  '/:id',
  validate(genreValidation.partialUpdate, options),
  GenreController.partialUpdate
);

router.delete(
  '/:id',
  validate(genreValidation.destroy, options),
  GenreController.destroy
);

export { router as genreRouter };

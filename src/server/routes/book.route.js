import { Router } from 'express';
import { validate } from 'express-validation';
import { BookController } from 'server/controllers';
import { bookValidation, options } from 'server/validations';

const router = Router();

router.get(
  '/',
  validate(bookValidation.getAll, options),
  BookController.getAll
);

router.get('/:id', BookController.get);

router.post(
  '/',
  validate(bookValidation.create, options),
  BookController.create
);

router.put(
  '/:id',
  validate(bookValidation.update, options),
  BookController.update
);

router.patch(
  '/:id',
  validate(bookValidation.partialUpdate, options),
  BookController.partialUpdate
);

router.delete(
  '/:id',
  validate(bookValidation.destroy, options),
  BookController.destroy
);

export { router as bookRouter };

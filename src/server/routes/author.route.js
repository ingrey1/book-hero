import { Router } from 'express';
import { validate } from 'express-validation';
import { AuthorController } from 'server/controllers';
import { authorValidation, options } from 'server/validations';

const router = Router();

router.get(
  '/',
  validate(authorValidation.getAll, options),
  AuthorController.getAll
);

router.get('/:id', AuthorController.get);

router.post(
  '/',
  validate(authorValidation.create, options),
  AuthorController.create
);

router.put(
  '/:id',
  validate(authorValidation.update, options),
  AuthorController.update
);

router.patch(
  '/:id',
  validate(authorValidation.partialUpdate, options),
  AuthorController.partialUpdate
);

router.delete(
  '/:id',
  validate(authorValidation.destroy, options),
  AuthorController.destroy
);

export { router as authorRouter };

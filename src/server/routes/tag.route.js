import { Router } from 'express';
import { validate } from 'express-validation';
import { TagController } from 'server/controllers';
import { tagValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(tagValidation.getAll, options), TagController.getAll);

router.get('/:id', TagController.get);

router.post('/', validate(tagValidation.create, options), TagController.create);

router.put(
  '/:id',
  validate(tagValidation.update, options),
  TagController.update
);

router.patch(
  '/:id',
  validate(tagValidation.partialUpdate, options),
  TagController.partialUpdate
);

router.delete(
  '/:id',
  validate(tagValidation.destroy, options),
  TagController.destroy
);

export { router as tagRouter };

import { authorValidation } from './author.validation';
import { bookValidation } from './book.validation';
import { genreValidation } from './genre.validation';
import { tagValidation } from './tag.validation';

const options = { keyByField: true };

export {
  bookValidation,
  authorValidation,
  genreValidation,
  tagValidation,
  options,
};

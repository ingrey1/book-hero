import { random } from 'faker';
import { Genre } from 'data/models';

const buildGenre = async (genreFks) => {
  const resGenre = {};

  resGenre.name = random.word().slice(0, 255);
  resGenre.description = random.word().slice(0, 255);

  if (genreFks.books !== null || typeof genreFks.books !== 'undefined') {
    resGenre.books = genreFks.books;
  }

  return resGenre;
};

const createGenre = async (fakeGenre) => {
  const genre = await Genre.create(fakeGenre);
  return genre;
};

export { buildGenre, createGenre };

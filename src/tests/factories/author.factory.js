import { datatype, random } from 'faker';
import { Author } from 'data/models';

const buildAuthor = async (authorFks) => {
  const resAuthor = {};

  resAuthor.firstName = random.word().slice(0, 255);
  resAuthor.lastName = random.word().slice(0, 255);
  resAuthor.age = datatype.number({ max: 200, min: 1 });

  if (authorFks.books !== null || typeof authorFks.books !== 'undefined') {
    resAuthor.books = authorFks.books;
  }

  return resAuthor;
};

const createAuthor = async (fakeAuthor) => {
  const author = await Author.create(fakeAuthor);
  return author;
};

export { buildAuthor, createAuthor };

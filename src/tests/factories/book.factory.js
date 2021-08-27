import { random } from 'faker';
import { Book } from 'data/models';

const buildBook = async (bookFks) => {
  const resBook = {};

  resBook.title = random.word().slice(0, 255);
  resBook.about = random.word().slice(0, 2550);

  if (bookFks.authors !== null || typeof bookFks.authors !== 'undefined') {
    resBook.authors = bookFks.authors;
  }
  if (bookFks.genres !== null || typeof bookFks.genres !== 'undefined') {
    resBook.genres = bookFks.genres;
  }
  if (bookFks.tags !== null || typeof bookFks.tags !== 'undefined') {
    resBook.tags = bookFks.tags;
  }

  return resBook;
};

const createBook = async (fakeBook) => {
  const book = await Book.create(fakeBook);
  return book;
};

export { buildBook, createBook };

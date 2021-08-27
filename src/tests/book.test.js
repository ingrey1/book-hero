import request from 'supertest';
import { Book } from 'data/models';
import { app } from 'server/app';
import {
  buildBook,
  buildAuthor,
  buildGenre,
  buildTag,
  createBook,
  createAuthor,
  createGenre,
  createTag,
} from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/book';

describe('Book tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created book', async () => {
    const fakeBook = await buildBook({});

    const response = await request(app).post(ENDPOINT).send(fakeBook);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseBook = response.body.data;

    const book = await Book.findByPk(responseBook.id);

    expect(book.title).toBe(fakeBook.title);
    expect(book.about).toBe(fakeBook.about);
  });

  test('/POST - Response with a new created book with many to many related models', async () => {
    const authorsDict = await buildAuthor({});
    const fakeAuthors = await createAuthor(authorsDict);
    const genresDict = await buildGenre({});
    const fakeGenres = await createGenre(genresDict);
    const tagsDict = await buildTag({});
    const fakeTags = await createTag(tagsDict);

    const fakeBook = await buildBook({
      authors: [fakeAuthors.id],
      genres: [fakeGenres.id],
      tags: [fakeTags.id],
    });

    const response = await request(app).post(ENDPOINT).send(fakeBook);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseBook = response.body.data;

    const book = await Book.findByPk(responseBook.id, {
      include: ['authors', 'genres', 'tags'],
    });

    expect(book.authors[0].id).toBe(fakeAuthors.id);
    expect(book.authors.length).toBe(1);
    expect(book.genres[0].id).toBe(fakeGenres.id);
    expect(book.genres.length).toBe(1);
    expect(book.tags[0].id).toBe(fakeTags.id);
    expect(book.tags.length).toBe(1);
  });

  test('/GET - Response with a book', async () => {
    const bookDict = await buildBook({});
    const fakeBook = await createBook(bookDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeBook.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeBook.id);
    expect(data.title).toBe(fakeBook.title);
    expect(data.about).toBe(fakeBook.about);
  });
  test('/GET - Response with a book not found', async () => {
    const bookDict = await buildBook({});
    const fakeBook = await createBook(bookDict);
    const { id } = fakeBook;
    await fakeBook.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of books', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allBook = await Book.findAll();
    expect(data.length).toBe(allBook.length);
  });
  test('/PUT - Response with an updated book', async () => {
    const bookDict = await buildBook({});
    const fakeBook = await createBook(bookDict);

    const anotherFakeBook = await buildBook({});

    const response = await request(app).put(`${ENDPOINT}/${fakeBook.id}`).send({
      title: anotherFakeBook.title,
      about: anotherFakeBook.about,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.title).toBe(anotherFakeBook.title);
    expect(data.about).toBe(anotherFakeBook.about);

    const updatedBook = await Book.findByPk(fakeBook.id);

    expect(updatedBook.title).toBe(anotherFakeBook.title);
    expect(updatedBook.about).toBe(anotherFakeBook.about);
  });

  test('/PUT - Book does not exists, book cant be updated', async () => {
    const bookDict = await buildBook({});
    const fakeBook = await createBook(bookDict);
    const { id } = fakeBook;
    await fakeBook.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      title: bookDict.title,
      about: bookDict.about,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated book (no updates)', async () => {
    const bookDict = await buildBook({});
    const fakeBook = await createBook(bookDict);

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeBook.id}`)
      .send({ authors: [], genres: [], tags: [] });

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated book', async () => {
    const bookDict = await buildBook({});
    const fakeBook = await createBook(bookDict);

    const anotherFakeBook = await buildBook({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeBook.id}`)
      .send({ title: anotherFakeBook.title });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.title).toBe(anotherFakeBook.title);

    const updatedBook = await Book.findByPk(fakeBook.id);

    expect(updatedBook.title).toBe(anotherFakeBook.title);
  });

  test('/PATCH - Book does not exists, book cant be updated', async () => {
    const bookDict = await buildBook({});
    const fakeBook = await createBook(bookDict);
    const { id } = fakeBook;
    const { title } = fakeBook;
    await fakeBook.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${id}`)
      .send({ title });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted book', async () => {
    const bookDict = await buildBook({});
    const fakeBook = await createBook(bookDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeBook.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeBook.id);

    const deletedBook = await Book.findByPk(fakeBook.id);
    expect(deletedBook).toBe(null);
  });

  test('/DELETE - Book does not exists, book cant be deleted', async () => {
    const bookDict = await buildBook({});
    const fakeBook = await createBook(bookDict);
    const { id } = fakeBook;
    await fakeBook.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});

import request from 'supertest';
import { Author } from 'data/models';
import { app } from 'server/app';
import { buildAuthor, buildBook, createAuthor, createBook } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/author';

describe('Author tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created author', async () => {
    const fakeAuthor = await buildAuthor({});

    const response = await request(app).post(ENDPOINT).send(fakeAuthor);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseAuthor = response.body.data;

    const author = await Author.findByPk(responseAuthor.id);

    expect(author.firstName).toBe(fakeAuthor.firstName);
    expect(author.lastName).toBe(fakeAuthor.lastName);
    expect(author.age).toBe(fakeAuthor.age);
  });

  test('/POST - Response with a new created author with many to many related models', async () => {
    const booksDict = await buildBook({});
    const fakeBooks = await createBook(booksDict);

    const fakeAuthor = await buildAuthor({ books: [fakeBooks.id] });

    const response = await request(app).post(ENDPOINT).send(fakeAuthor);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseAuthor = response.body.data;

    const author = await Author.findByPk(responseAuthor.id, {
      include: ['books'],
    });

    expect(author.books[0].id).toBe(fakeBooks.id);
    expect(author.books.length).toBe(1);
  });

  test('/GET - Response with a author', async () => {
    const authorDict = await buildAuthor({});
    const fakeAuthor = await createAuthor(authorDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeAuthor.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeAuthor.id);
    expect(data.firstName).toBe(fakeAuthor.firstName);
    expect(data.lastName).toBe(fakeAuthor.lastName);
    expect(data.age).toBe(fakeAuthor.age);
  });
  test('/GET - Response with a author not found', async () => {
    const authorDict = await buildAuthor({});
    const fakeAuthor = await createAuthor(authorDict);
    const { id } = fakeAuthor;
    await fakeAuthor.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of authors', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allAuthor = await Author.findAll();
    expect(data.length).toBe(allAuthor.length);
  });
  test('/PUT - Response with an updated author', async () => {
    const authorDict = await buildAuthor({});
    const fakeAuthor = await createAuthor(authorDict);

    const anotherFakeAuthor = await buildAuthor({});

    const response = await request(app)
      .put(`${ENDPOINT}/${fakeAuthor.id}`)
      .send({
        firstName: anotherFakeAuthor.firstName,
        lastName: anotherFakeAuthor.lastName,
        age: anotherFakeAuthor.age,
      });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.firstName).toBe(anotherFakeAuthor.firstName);
    expect(data.lastName).toBe(anotherFakeAuthor.lastName);
    expect(data.age).toBe(anotherFakeAuthor.age);

    const updatedAuthor = await Author.findByPk(fakeAuthor.id);

    expect(updatedAuthor.firstName).toBe(anotherFakeAuthor.firstName);
    expect(updatedAuthor.lastName).toBe(anotherFakeAuthor.lastName);
    expect(updatedAuthor.age).toBe(anotherFakeAuthor.age);
  });

  test('/PUT - Author does not exists, author cant be updated', async () => {
    const authorDict = await buildAuthor({});
    const fakeAuthor = await createAuthor(authorDict);
    const { id } = fakeAuthor;
    await fakeAuthor.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      firstName: authorDict.firstName,
      lastName: authorDict.lastName,
      age: authorDict.age,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated author (no updates)', async () => {
    const authorDict = await buildAuthor({});
    const fakeAuthor = await createAuthor(authorDict);

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeAuthor.id}`)
      .send({ books: [] });

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated author', async () => {
    const authorDict = await buildAuthor({});
    const fakeAuthor = await createAuthor(authorDict);

    const anotherFakeAuthor = await buildAuthor({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeAuthor.id}`)
      .send({ firstName: anotherFakeAuthor.firstName });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.firstName).toBe(anotherFakeAuthor.firstName);

    const updatedAuthor = await Author.findByPk(fakeAuthor.id);

    expect(updatedAuthor.firstName).toBe(anotherFakeAuthor.firstName);
  });

  test('/PATCH - Author does not exists, author cant be updated', async () => {
    const authorDict = await buildAuthor({});
    const fakeAuthor = await createAuthor(authorDict);
    const { id } = fakeAuthor;
    const { firstName } = fakeAuthor;
    await fakeAuthor.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${id}`)
      .send({ firstName });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted author', async () => {
    const authorDict = await buildAuthor({});
    const fakeAuthor = await createAuthor(authorDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeAuthor.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeAuthor.id);

    const deletedAuthor = await Author.findByPk(fakeAuthor.id);
    expect(deletedAuthor).toBe(null);
  });

  test('/DELETE - Author does not exists, author cant be deleted', async () => {
    const authorDict = await buildAuthor({});
    const fakeAuthor = await createAuthor(authorDict);
    const { id } = fakeAuthor;
    await fakeAuthor.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});

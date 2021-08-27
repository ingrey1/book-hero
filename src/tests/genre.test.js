import request from 'supertest';
import { Genre } from 'data/models';
import { app } from 'server/app';
import { buildGenre, buildBook, createGenre, createBook } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/genre';

describe('Genre tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created genre', async () => {
    const fakeGenre = await buildGenre({});

    const response = await request(app).post(ENDPOINT).send(fakeGenre);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseGenre = response.body.data;

    const genre = await Genre.findByPk(responseGenre.id);

    expect(genre.name).toBe(fakeGenre.name);
    expect(genre.description).toBe(fakeGenre.description);
  });

  test('/POST - Response with a new created genre with many to many related models', async () => {
    const booksDict = await buildBook({});
    const fakeBooks = await createBook(booksDict);

    const fakeGenre = await buildGenre({ books: [fakeBooks.id] });

    const response = await request(app).post(ENDPOINT).send(fakeGenre);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseGenre = response.body.data;

    const genre = await Genre.findByPk(responseGenre.id, {
      include: ['books'],
    });

    expect(genre.books[0].id).toBe(fakeBooks.id);
    expect(genre.books.length).toBe(1);
  });

  test('/GET - Response with a genre', async () => {
    const genreDict = await buildGenre({});
    const fakeGenre = await createGenre(genreDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeGenre.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeGenre.id);
    expect(data.name).toBe(fakeGenre.name);
    expect(data.description).toBe(fakeGenre.description);
  });
  test('/GET - Response with a genre not found', async () => {
    const genreDict = await buildGenre({});
    const fakeGenre = await createGenre(genreDict);
    const { id } = fakeGenre;
    await fakeGenre.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of genres', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allGenre = await Genre.findAll();
    expect(data.length).toBe(allGenre.length);
  });
  test('/PUT - Response with an updated genre', async () => {
    const genreDict = await buildGenre({});
    const fakeGenre = await createGenre(genreDict);

    const anotherFakeGenre = await buildGenre({});

    const response = await request(app)
      .put(`${ENDPOINT}/${fakeGenre.id}`)
      .send({
        name: anotherFakeGenre.name,
        description: anotherFakeGenre.description,
      });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(anotherFakeGenre.name);
    expect(data.description).toBe(anotherFakeGenre.description);

    const updatedGenre = await Genre.findByPk(fakeGenre.id);

    expect(updatedGenre.name).toBe(anotherFakeGenre.name);
    expect(updatedGenre.description).toBe(anotherFakeGenre.description);
  });

  test('/PUT - Genre does not exists, genre cant be updated', async () => {
    const genreDict = await buildGenre({});
    const fakeGenre = await createGenre(genreDict);
    const { id } = fakeGenre;
    await fakeGenre.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      name: genreDict.name,
      description: genreDict.description,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated genre (no updates)', async () => {
    const genreDict = await buildGenre({});
    const fakeGenre = await createGenre(genreDict);

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeGenre.id}`)
      .send({ books: [] });

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated genre', async () => {
    const genreDict = await buildGenre({});
    const fakeGenre = await createGenre(genreDict);

    const anotherFakeGenre = await buildGenre({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeGenre.id}`)
      .send({ name: anotherFakeGenre.name });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(anotherFakeGenre.name);

    const updatedGenre = await Genre.findByPk(fakeGenre.id);

    expect(updatedGenre.name).toBe(anotherFakeGenre.name);
  });

  test('/PATCH - Genre does not exists, genre cant be updated', async () => {
    const genreDict = await buildGenre({});
    const fakeGenre = await createGenre(genreDict);
    const { id } = fakeGenre;
    const { name } = fakeGenre;
    await fakeGenre.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${id}`)
      .send({ name });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted genre', async () => {
    const genreDict = await buildGenre({});
    const fakeGenre = await createGenre(genreDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeGenre.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeGenre.id);

    const deletedGenre = await Genre.findByPk(fakeGenre.id);
    expect(deletedGenre).toBe(null);
  });

  test('/DELETE - Genre does not exists, genre cant be deleted', async () => {
    const genreDict = await buildGenre({});
    const fakeGenre = await createGenre(genreDict);
    const { id } = fakeGenre;
    await fakeGenre.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});

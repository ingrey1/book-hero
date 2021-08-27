import request from 'supertest';
import { Tag } from 'data/models';
import { app } from 'server/app';
import { buildTag, buildBook, createTag, createBook } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/tag';

describe('Tag tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created tag', async () => {
    const fakeTag = await buildTag({});

    const response = await request(app).post(ENDPOINT).send(fakeTag);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseTag = response.body.data;

    const tag = await Tag.findByPk(responseTag.id);

    expect(tag.name).toBe(fakeTag.name);
    expect(tag.description).toBe(fakeTag.description);
  });

  test('/POST - Response with a new created tag with many to many related models', async () => {
    const booksDict = await buildBook({});
    const fakeBooks = await createBook(booksDict);

    const fakeTag = await buildTag({ books: [fakeBooks.id] });

    const response = await request(app).post(ENDPOINT).send(fakeTag);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseTag = response.body.data;

    const tag = await Tag.findByPk(responseTag.id, { include: ['books'] });

    expect(tag.books[0].id).toBe(fakeBooks.id);
    expect(tag.books.length).toBe(1);
  });

  test('/GET - Response with a tag', async () => {
    const tagDict = await buildTag({});
    const fakeTag = await createTag(tagDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeTag.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeTag.id);
    expect(data.name).toBe(fakeTag.name);
    expect(data.description).toBe(fakeTag.description);
  });
  test('/GET - Response with a tag not found', async () => {
    const tagDict = await buildTag({});
    const fakeTag = await createTag(tagDict);
    const { id } = fakeTag;
    await fakeTag.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of tags', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allTag = await Tag.findAll();
    expect(data.length).toBe(allTag.length);
  });
  test('/PUT - Response with an updated tag', async () => {
    const tagDict = await buildTag({});
    const fakeTag = await createTag(tagDict);

    const anotherFakeTag = await buildTag({});

    const response = await request(app).put(`${ENDPOINT}/${fakeTag.id}`).send({
      name: anotherFakeTag.name,
      description: anotherFakeTag.description,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(anotherFakeTag.name);
    expect(data.description).toBe(anotherFakeTag.description);

    const updatedTag = await Tag.findByPk(fakeTag.id);

    expect(updatedTag.name).toBe(anotherFakeTag.name);
    expect(updatedTag.description).toBe(anotherFakeTag.description);
  });

  test('/PUT - Tag does not exists, tag cant be updated', async () => {
    const tagDict = await buildTag({});
    const fakeTag = await createTag(tagDict);
    const { id } = fakeTag;
    await fakeTag.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      name: tagDict.name,
      description: tagDict.description,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated tag (no updates)', async () => {
    const tagDict = await buildTag({});
    const fakeTag = await createTag(tagDict);

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTag.id}`)
      .send({ books: [] });

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated tag', async () => {
    const tagDict = await buildTag({});
    const fakeTag = await createTag(tagDict);

    const anotherFakeTag = await buildTag({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTag.id}`)
      .send({ name: anotherFakeTag.name });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(anotherFakeTag.name);

    const updatedTag = await Tag.findByPk(fakeTag.id);

    expect(updatedTag.name).toBe(anotherFakeTag.name);
  });

  test('/PATCH - Tag does not exists, tag cant be updated', async () => {
    const tagDict = await buildTag({});
    const fakeTag = await createTag(tagDict);
    const { id } = fakeTag;
    const { name } = fakeTag;
    await fakeTag.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${id}`)
      .send({ name });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted tag', async () => {
    const tagDict = await buildTag({});
    const fakeTag = await createTag(tagDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeTag.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeTag.id);

    const deletedTag = await Tag.findByPk(fakeTag.id);
    expect(deletedTag).toBe(null);
  });

  test('/DELETE - Tag does not exists, tag cant be deleted', async () => {
    const tagDict = await buildTag({});
    const fakeTag = await createTag(tagDict);
    const { id } = fakeTag;
    await fakeTag.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});

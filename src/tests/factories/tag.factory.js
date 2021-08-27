import { random } from 'faker';
import { Tag } from 'data/models';

const buildTag = async (tagFks) => {
  const resTag = {};

  resTag.name = random.word().slice(0, 255);
  resTag.description = random.word().slice(0, 255);

  if (tagFks.books !== null || typeof tagFks.books !== 'undefined') {
    resTag.books = tagFks.books;
  }

  return resTag;
};

const createTag = async (fakeTag) => {
  const tag = await Tag.create(fakeTag);
  return tag;
};

export { buildTag, createTag };

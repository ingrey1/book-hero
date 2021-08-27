import Sequelize from 'sequelize';
import config from 'config';

import { authorModel } from './author.model';
import { bookModel } from './book.model';
import { genreModel } from './genre.model';
import { tagModel } from './tag.model';

const pg = require('pg');

// https://github.com/sequelize/sequelize/issues/4550
pg.defaults.parseInt8 = true;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
  }
);

bookModel(sequelize);
authorModel(sequelize);
genreModel(sequelize);
tagModel(sequelize);

const { Book, Author, Genre, Tag } = sequelize.models;

Book.associate(sequelize.models);
Author.associate(sequelize.models);
Genre.associate(sequelize.models);
Tag.associate(sequelize.models);

if (process.env.NODE_ENV !== 'test' && !process.env.USE_MIGRATIONS) {
  sequelize.sync({ alter: true });
}

export { sequelize, Book, Author, Genre, Tag };

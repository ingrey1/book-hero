import { DataTypes } from 'sequelize';

const bookModel = (sequelize) => {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      about: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 2550],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  Book.associate = (models) => {
    Book.belongsToMany(models.Author, { as: 'authors', through: 'BookAuthor' });
    Book.belongsToMany(models.Genre, { as: 'genres', through: 'BookGenre' });
    Book.belongsToMany(models.Tag, { as: 'tags', through: 'BookTag' });
  };
};

export { bookModel };

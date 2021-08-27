import { DataTypes } from 'sequelize';

const genreModel = (sequelize) => {
  const Genre = sequelize.define(
    'Genre',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  Genre.associate = (models) => {
    Genre.belongsToMany(models.Book, { as: 'books', through: 'BookGenre' });
  };
};

export { genreModel };

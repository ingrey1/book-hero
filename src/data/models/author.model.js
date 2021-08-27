import { DataTypes } from 'sequelize';

const authorModel = (sequelize) => {
  const Author = sequelize.define(
    'Author',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 200,
          min: 1,
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  Author.associate = (models) => {
    Author.belongsToMany(models.Book, { as: 'books', through: 'BookAuthor' });
  };
};

export { authorModel };

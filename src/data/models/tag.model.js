import { DataTypes } from 'sequelize';

const tagModel = (sequelize) => {
  const Tag = sequelize.define(
    'Tag',
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
  Tag.associate = (models) => {
    Tag.belongsToMany(models.Book, { as: 'books', through: 'BookTag' });
  };
};

export { tagModel };

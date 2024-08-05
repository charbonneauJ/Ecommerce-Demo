const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrementIdentity: true,
      primaryKey: true,
      unique: true,
    },
    
    category_name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;

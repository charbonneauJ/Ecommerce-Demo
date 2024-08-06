// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },

   product_name: {
    type: DataTypes.CHAR,
    allowNull: false,
    unique: true,
   },

   price: {
    type: DataTypes.FLOAT,
    allowNull: false,

   },
   
   stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 10,
   },

   category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "category",
      key: "id",
    }
   }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

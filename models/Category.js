const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

//Create Category model
class Category extends Model {}

//define table col & config
Category.init(
  {
    //ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //category_name column
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
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

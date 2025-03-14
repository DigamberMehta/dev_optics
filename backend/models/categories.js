// models/categories.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import

const CategoriesModel = (sequelize) => {
  const Categories = sequelize.define('Categories', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    parent_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories', // Use the string name here
        key: 'category_id',
      },
    },
  }, {
    tableName: 'Categories',
    timestamps: false,
  });

  return Categories;
};

export default CategoriesModel;
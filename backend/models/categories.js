// models/category.js
import { DataTypes } from 'sequelize';

const CategoryModel = (sequelize) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    // Optional: For category hierarchy
    parent_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'category_id',
      },
      allowNull: true,
    },
  }, {
    tableName: 'Categories',
    timestamps: true,
  });

  return Category;
};

export default CategoryModel;
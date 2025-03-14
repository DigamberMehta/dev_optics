// models/categories.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Categories from './categories'; // Import Categories model for self-reference

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
      model: Categories,
      key: 'category_id',
    },
  },
}, {
  tableName: 'Categories',
  timestamps: false, // Assuming no timestamps in the original schema for Categories
});

export default Categories;
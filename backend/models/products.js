// models/products.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Categories from './categories'; // Import Categories model

const Products = sequelize.define('Products', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categories,
      key: 'category_id',
    },
  },
  product_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  brand: {
    type: DataTypes.STRING(100),
  },
  images: {
    type: DataTypes.JSON, // Store an array of image objects (url, alt_text, display_order)
    defaultValue: [],
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'Products',
  updatedAt: 'updated_at', // To match the schema's column name
  createdAt: 'created_at', // To match the schema's column name
});

export default Products;
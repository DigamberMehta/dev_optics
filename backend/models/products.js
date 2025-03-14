// models/products.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import Categories from './categories.js'; // Import Categories model - will be handled in index.js

const ProductsModel = (sequelize) => {
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
        model: 'Categories', // Use the string name here
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
      defaultValue:[],
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
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });

  return Products;
};

export default ProductsModel;
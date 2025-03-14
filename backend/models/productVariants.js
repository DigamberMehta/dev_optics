// models/productVariants.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Products from './products'; // Import Products model

const ProductVariants = sequelize.define('ProductVariants', {
  variant_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: 'product_id',
    },
  },
  sku: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  color: {
    type: DataTypes.STRING(50),
  },
  size: {
    type: DataTypes.STRING(50),
  },
  lens_type: {
    type: DataTypes.STRING(50),
  },
  frame_material: {
    type: DataTypes.STRING(50),
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'ProductVariants',
  timestamps: false, // Assuming no timestamps in the original schema for ProductVariants
});

export default ProductVariants;
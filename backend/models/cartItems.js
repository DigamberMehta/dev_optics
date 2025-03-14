// models/cartItems.js
import { DataTypes } from 'sequelize';
import sequelize from '../index';
import Carts from './carts'; // Import Carts model
import ProductVariants from './productVariants'; // Import ProductVariants model

const CartItems = sequelize.define('CartItems', {
  cart_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Carts,
      key: 'cart_id',
    },
  },
  variant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductVariants,
      key: 'variant_id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'CartItems',
  timestamps: false, // Assuming no timestamps in the original schema for CartItems
});

export default CartItems;
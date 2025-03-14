// models/cartItems.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import Carts from './carts.js'; // Import Carts model - will be handled in index.js
// import ProductVariants from './productVariants.js'; // Import ProductVariants model - will be handled in index.js

const CartItemsModel = (sequelize) => {
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
        model: 'Carts', // Use the string name here
        key: 'cart_id',
      },
    },
    variant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ProductVariants', // Use the string name here
        key: 'variant_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'CartItems',
    timestamps: false,
  });

  return CartItems;
};

export default CartItemsModel;
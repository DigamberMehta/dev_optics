// models/cartItems.js
import { DataTypes } from 'sequelize';

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
    product_id: { // Changed from variant_id to product_id
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', // Use the string name here
        key: 'product_id',
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
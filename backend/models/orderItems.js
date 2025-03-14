// models/orderItems.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import Orders from './orders.js'; // Import Orders model - will be handled in index.js
// import ProductVariants from './productVariants.js'; // Import ProductVariants model - will be handled in index.js

const OrderItemsModel = (sequelize) => {
  const OrderItems = sequelize.define('OrderItems', {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders', // Use the string name here
        key: 'order_id',
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
    unit_price_at_purchase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    tableName: 'OrderItems',
    timestamps: false,
  });

  return OrderItems;
};

export default OrderItemsModel;